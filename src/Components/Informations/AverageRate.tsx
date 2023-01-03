import axios from 'axios';
import { useEffect, useState } from 'react';
import { Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import MonthComp from './MonthComp';
import RefreshComp, { startRefreshAnimation, stopRefreshAnimation } from './RefreshComp';
import DayEvening from './dayEveningComp';

function AverageRate() {
	let month = new Date().getMonth() + 1;
	const color = '#FFC482';
	const Months = ['Décembre', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre'];

	let isEvening = false;

	function dayEvenSwitch(v: boolean) {
		isEvening = v;
		refresh();
	}

	const [Rate, setRate] = useState(
		<div>
			<div className='rotateError'>
				Veuillez tourner votre appareil
			</div>
			<div className='ChartContainer'>
				<RefreshComp callback={refresh} pingColor={color} />
				<DayEvening callback={dayEvenSwitch} />
				<div className='ChartError'>Récupération des données...</div >
			</div>
		</div>
	);

	function drawData(dataset: any) {
		function CustomTooltip({ active, payload }): JSX.Element {
			const dateToText = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
			if (active && payload && payload.length) {
				const date = new Date(payload[0].payload.Date);
				const value = payload[0].payload.Average;
				return (
					<div className="customTooltip">
						{`${dateToText[date.getDay()]} : ${value}`}
					</div>
				);
			}
			return <></>;
		};

		return (
			<div className='Chart'>
				<RefreshComp callback={refresh} pingColor={color} />
				<MonthComp callback={(m: number) => {
					month = m;
					refresh();
				}} />
				<DayEvening callback={dayEvenSwitch} />
				<div className='PageTitle'>
					Moyenne des notes
				</div>
				<div className='ChartContainer'>
					<ResponsiveContainer width="100%" height="89%">
						<ComposedChart
							width={500}
							height={400}
							data={dataset}
							margin={{
								top: 20,
								right: 20,
								bottom: 20,
								left: 20,
							}}>
							<CartesianGrid strokeDasharray="10 10" />
							<XAxis dataKey={(v) => {
								const date = new Date(v.Date).toLocaleDateString("fr").split("/");
								return date[0] + '/' + date[1];
							}} tick={{ fill: '#F5FEF5' }} tickLine={{ stroke: '#F5FEF5' }} />
							<YAxis dataKey="Average" tick={{ fill: '#F5FEF5' }} tickLine={{ stroke: '#F5FEF5' }} domain={[0, 5]} />
							{/*@ts-ignore*/}
							<Tooltip cursor={false} content={<CustomTooltip />} />
							<Bar dataKey="Average" fill="#FFC482" />
							<Line type="monotone" dataKey="globalAverage" stroke="#E7485595" strokeWidth={4} dot={false} activeDot={false} />
						</ComposedChart>
					</ResponsiveContainer>
					<div className='legend'>
						<div className='legendTickLine'></div>
						Moyenne : {dataset[0].globalAverage}
					</div>
				</div>
			</div>
		);
	}

	function getData() {
		return new Promise(async (resolve) => {
			const D = new Date();
			const address = isEvening ? 'https://menuvox.fr:8081/ratesEvening/' : 'https://menuvox.fr:8081/rates/';
			await axios.post(address + month, { jwt: JSON.parse(window.localStorage.getItem('jwt') as string) }).then(res => {
				let dataset: Array<{ globalAverage?: any, Date: any, Average: any }> = [];
				let averageMonth: number = 0;
				let numberAverage: number = 0;
				res.data.data.forEach((element: any) => {
					const date = new Date(D.getFullYear(), month - 1, element[0]);
					let average = 0;
					element[1].forEach((rate: { rate: number }) => {
						average += rate.rate;
					});
					if (average) {
						average = parseFloat((average / element[1].length).toFixed(1));
					}
					dataset.push({ Date: date, Average: average });
					averageMonth += parseFloat(average.toFixed(2));
					// to fixed is unfunctional in this place
					numberAverage++;
				});
				averageMonth = averageMonth / numberAverage;
				dataset.forEach(element => {
					element.globalAverage = parseFloat(averageMonth.toFixed(2));
				});
				dataset.sort((a: { Date: Date }, b: { Date: Date }) => {
					const nameA = a.Date;
					const nameB = b.Date;
					if (nameA < nameB) {
						return -1;
					}
					if (nameA > nameB) {
						return 1;
					}
					return 0;
				});
				resolve(dataset);
			}).catch(err => {
				console.error(err);
				resolve(err.request.status);
			});
		});
	}

	function refresh() {
		startRefreshAnimation();
		return getData().then(data => {
			stopRefreshAnimation();
			if (data) {
				if (data === 404) {
					setRate(
						<div>
							<div className='rotateError'>
								Veuillez tourner votre appareil
							</div>
							<div className='ChartContainer'>
								<RefreshComp callback={refresh} pingColor={color} />
								<MonthComp callback={(m: number) => {
									month = m;
									refresh();
								}} />
								<DayEvening callback={dayEvenSwitch} />
								<div className='ChartError'>
									{Months[month] ? `Aucune donnée n'est disponible pour ${Months[month]}` : 'Aucune donnée n\'est disponible'}
								</div>
							</div>
						</div>
					);
				} else {
					setRate(
						<div>
							<div className='rotateError'>
								Veuillez tourner votre appareil
							</div>
							{drawData(data)}
						</div>
					);
				}
			} else {
				setRate(
					<div>
						<div className='rotateError'>
							Veuillez tourner votre appareil
						</div>
						<div className='ChartContainer'>
							<RefreshComp callback={refresh} pingColor={color} />
							<div className='ChartError'>Une erreur est survenue</div>
						</div>
					</div>
				);
			}
		});
	}

	useEffect(() => {
		refresh();
		// Don't pass any arg that need the "RefreshComp" component, to prevent infinite refresh
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


	return Rate;
}

export default AverageRate;