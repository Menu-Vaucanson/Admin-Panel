import axios from 'axios';
import { Line, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ComposedChart, CartesianGrid } from 'recharts';
import { useState, useEffect } from 'react';

import RefreshComp, { startRefreshAnimation, stopRefreshAnimation } from './RefreshComp.tsx';
import MonthComp from './CalendarComp.tsx';


function AverageRate() {
	const color = '#FFC482';

	const Months = ['Décembre', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre'];

	const [Rate, setRate] = useState(
		<div>
			<div className='rotateError'>
				Veuillez tourner votre appareil
			</div>
			<div className='ChartContainer'>
				<RefreshComp callback={refresh} pingColor={color} />
				<div className='ChartError'>Récupération des données...</div >
			</div>
		</div>
	);

	function drawData(dataset: any) {
		const CustomTooltip = ({ active, payload }) => {
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
			return null;
		};
		return (
			<div className='Chart'>
				<RefreshComp callback={refresh} pingColor={color} />
				<MonthComp callback={refresh} />
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
							<XAxis dataKey={(v) => v = new Date(v.Date).getDate()} tick={{ fill: '#F5FEF5' }} tickLine={{ stroke: '#F5FEF5' }} />
							<YAxis dataKey="Average" tick={{ fill: '#F5FEF5' }} tickLine={{ stroke: '#F5FEF5' }} domain={[0, 5]} />
							{/*@ts-ignore*/}
							<Tooltip cursor={false} content={<CustomTooltip />} />
							<Bar dataKey="Average" fill="#FFC482" />
							<Line type="monotone" dataKey="globalAverage" stroke="#E74855" strokeWidth={4} dot={false} activeDot={false} />
						</ComposedChart>
					</ResponsiveContainer>
					<div className='legend'><div className='legendTickLine'></div>Moyenne : {dataset[0].globalAverage}</div>
				</div>
			</div>
		)
	}

	function getData(month: number) {
		return new Promise(async (resolve) => {
			const D = new Date();
			await axios.post('https://menuvox.fr:8081/rates/' + month, { jwt: JSON.parse(window.localStorage.getItem('jwt') as string) }).then(res => {
				let dataset: Array<{ globalAverage?: any, Date: any, Average: any }> = [];
				let averageMonth = 0;
				let numberAverage = 0;
				res.data.data.forEach((element: any) => {
					const date = new Date(D.getFullYear(), D.getMonth(), element[0]);
					let average = 0
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

				})
				averageMonth = averageMonth / numberAverage;
				dataset.forEach(element => {
					element.globalAverage = parseFloat(averageMonth.toFixed(2));
				});
				dataset.sort((a, b) => {
					const nameA: Date = a.Date;
					const nameB: Date = b.Date;
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
				console.log(err);
				resolve(err.request.status);
			});
		});
	}

	function refresh(month: number) {
		startRefreshAnimation();
		return getData(month).then(data => {
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
								<MonthComp callback={refresh} />
								<div className='ChartError'>
									Aucune donnée n'est disponible pour {Months[month]}
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
				)
			}
		});
	}

	useEffect(() => {
		refresh(new Date().getMonth() + 1);
		// Don't pass any arg that need the "RefreshComp" component, to prevent infinite refresh
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


	return Rate;
}

export default AverageRate;