import axios from 'axios';
import { useEffect, useState } from 'react';
import { Area, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts';

import MonthComp from './MonthComp';
import RefreshComp, { startRefreshAnimation, stopRefreshAnimation } from './RefreshComp';

function View() {
	let month = new Date().getMonth() + 1;
	const color = "#08A47C";
	const Months = ['Décembre', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre'];


	function drawData(dataset: any) {
		function CustomTooltip({ active, payload }: TooltipProps<number, string>) {
			const dateToText = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
			if (active && payload && payload.length) {
				const date = new Date(payload[0].payload.Date);
				const value: number = payload[0].payload.Number;
				return (
					<div className="customTooltip">
						{`${dateToText[date.getDay()]}: ${value}`}
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
				<div className='PageTitle'>
					Nombres de vues
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
									<stop offset="5%" stopColor="#08A47C" stopOpacity={0.4} />
									<stop offset="95%" stopColor="#08A47C" stopOpacity={0} />
								</linearGradient>
							</defs>
							<CartesianGrid strokeDasharray="10 10" />
							<XAxis dataKey={(v) => {
								const date = new Date(v.Date).toLocaleDateString("fr").split("/");
								return date[0] + '/' + date[1];
							}} tick={{ fill: '#F5FEF5' }} tickLine={{ stroke: '#F5FEF5' }} />
							<YAxis dataKey="Number" tick={{ fill: '#F5FEF5' }} tickLine={{ stroke: '#F5FEF5' }} />
							<Tooltip content={<CustomTooltip />} />
							<Area strokeWidth={4} type="monotone" dataKey="Number" stroke="#08A47C" dot={{ strokeWidth: 1 }} fillOpacity={1} fill="url(#ColorNumber)" />
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
			</div >
		);
	}
	const [View, setView] = useState(
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

	function getData(month: number) {
		return new Promise(async (resolve) => {
			await axios.post('https://menuvox.fr:8081/logs/' + month, { jwt: JSON.parse(window.localStorage.getItem('jwt') as string) }).then(res => {
				let dataset: Array<{
					Date: Date, Number: number, Numberview?: number, globalAverage?: number
				}> = []
				//avrange
				let averageMonth: number = 0;
				let numberAverage: number = 0;
				res.data.data.forEach((element: { ip: string, date: Date, request: { any } }) => {
					if (Object.keys(element.request).length === 0) {
						return;
					}
					//avrange
					averageMonth++;
					const date = new Date(element.date);
					const index = dataset.findIndex(v => new Date(v.Date).getDate() === date.getDate());
					if (index !== -1) {
						dataset[index].Number++;
					} else {
						dataset.push({ Date: date, Number: 1 })
						//if is first datat of this day  
						numberAverage++;
					}
				});
				//avrange
				averageMonth = averageMonth / numberAverage;
				dataset.forEach(element => {
					element.globalAverage = parseFloat(averageMonth.toFixed(2));
					element.Numberview = res.data.data.length;
				});
				resolve(Array.from(dataset));
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
					setView(
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
								<div className='ChartError'>
									{Months[month] ? `Aucune donnée n'est disponible pour ${Months[month]}` : 'Aucune donnée n\'est disponible'}
								</div>
							</div>
						</div>
					);
				} else {
					setView(
						<div>
							<div className='rotateError'>
								Veuillez tourner votre appareil
							</div>
							{drawData(data)}
						</div>
					);
				}
			} else {
				setView(
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

	return View;
}

export default View;