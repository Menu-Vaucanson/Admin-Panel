import axios from 'axios';
import { useEffect, useState } from 'react';
import { Area, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts';

import MonthComp from './MonthComp';
import RefreshComp, { startRefreshAnimation, stopRefreshAnimation } from './RefreshComp';
import DayEvening from './dayEveningComp';

function NumberRate() {
	let month = new Date().getMonth() + 1;
	const color = '#4775FF';
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
		const dateToText = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
		const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
			if (active && payload && payload.length) {
				const date: Date = new Date(payload[0].payload.Date);
				const value: number = payload[0].payload.Number;
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
				<MonthComp callback={(m: number) => {
					month = m;
					refresh();
				}} />
				<DayEvening callback={dayEvenSwitch} />
				<div className='PageTitle'>
					Nombres de notes
				</div>
				<div className='ChartContainer'>
					<ResponsiveContainer width="100%" height="89%">
						<ComposedChart
							data={dataset}
							margin={{
								top: 10,
								right: 30,
								left: 0,
								bottom: 0,
							}}
						>
							<defs>
								<linearGradient id="ColorNumber" x1="0" y1="0" x2="0" y2="2">
									<stop offset="5%" stopColor="#4775FF" stopOpacity={0.4} />
									<stop offset="95%" stopColor="#4775FF" stopOpacity={0} />
								</linearGradient>
							</defs>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey={(v) => {
								const date = new Date(v.Date).toLocaleDateString("fr").split("/");
								return date[0] + '/' + date[1];
							}} tick={{ fill: '#F5FEF5' }} tickLine={{ stroke: '#F5FEF5' }} />
							<YAxis dataKey="Number" tick={{ fill: '#F5FEF5' }} tickLine={{ stroke: '#F5FEF5' }} />
							<Tooltip cursor={false} content={<CustomTooltip />} />
							<Area type="monotone" dataKey="Number" stroke="#4775FF" fillOpacity={1} fill="url(#ColorNumber)" />
							<Line type="monotone" dataKey="globalAverage" stroke="#E74855" strokeWidth={4} dot={false} activeDot={false} opacity="90%" />
						</ComposedChart>
					</ResponsiveContainer>
				</div>
				<div className='legends'>
					<div className='legend'>
						<div className='legendTickLine'></div>
						Moyenne : {dataset[0].globalAverage}
					</div>
					<div className='legend'>
						Total : {dataset[0].Numberview}
					</div>
				</div>
			</div>
		)
	}
	function getData(month: number) {
		return new Promise(async (resolve) => {
			const D = new Date();
			const address = isEvening ? 'https://menuvox.fr:8081/ratesEvening/' : 'https://menuvox.fr:8081/rates/';
			await axios.post(address + month, { jwt: JSON.parse(window.localStorage.getItem('jwt') as string) }).then(res => {
				let dataset: Array<{
					Date: Date, Number: number, globalAverage?: number, Numberview?: number;
				}> = [];
				let NumberRate = 0;
				let averageMonth: number = 0;
				let numberAverage: number = 0;
				res.data.data.forEach((element: any) => {
					const date = new Date(D.getFullYear(), month - 1, element[0]);
					let number = element[1].length;
					// Average
					averageMonth += parseFloat(element[1].length);
					numberAverage++;
					dataset.push({ Date: date, Number: number })
					NumberRate += number;
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
				//avrange
				averageMonth = averageMonth / numberAverage;
				dataset.forEach(element => {
					element.globalAverage = parseFloat(averageMonth.toFixed(2));
					element.Numberview = NumberRate;
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
					setRate(<div>
						<div className='rotateError'>
							Veuillez tourner votre appareil
						</div>
						{drawData(data)}
					</div>);
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
		//!\\ Don't pass any arg that need the "RefreshComp" component, to prevent infinite refresh
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return Rate;
}

export default NumberRate;
