import axios from 'axios';
import { TooltipProps, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

import RefreshComp, { startRefreshAnimation, stopRefreshAnimation } from './RefreshComp';
import MonthComp from './CalendarComp';


function ViewAndNumber() {
	const color = '#E74855';

	const Months = ['Décembre', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre'];

	function drawData(dataset: any) {
		const dateToText = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
		const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
			if (active && payload && payload.length) {
				const date = new Date(payload[0].payload.date);
				let rate = payload[0].payload.rate;
				let view = payload[0].payload.view;
				if (typeof view == 'undefined') {
					view = '';
				} else {
					view = `Vues: ${view}`;
				}
				if (typeof rate == 'undefined') {
					rate = '';
				} else {
					rate = `Notes: ${rate} `
				}
				return (
					<div className="customTooltip">
						{`${dateToText[date.getDay()]} ${view} ${rate} `}
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
					Nombres de note
				</div>
				<div className='ChartContainer'>
					<ResponsiveContainer width="100%" height="89%">
						<AreaChart
							data={dataset}
							margin={{
								top: 5,
								right: 30,
								left: 20,
								bottom: 5,
							}}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey={(v) => new Date(v.date).getDate()} style={{ 'color': 'lime' }} tick={{ fill: '#F5FEF5' }} tickLine={{ stroke: '#F5FEF5' }} />
							<YAxis stroke='#82CA9D' yAxisId="right" orientation="right" type="number" dataKey="rate" />
							<YAxis stroke='#8884D8' yAxisId="left" type="number" dataKey="view" />
							<Tooltip content={<CustomTooltip />} />
							<Area yAxisId="left" type="monotone" dataKey="view" stroke="#8884d8" fillOpacity={0.6} fill="#8884D8" />
							<Area yAxisId="right" type="monotone" dataKey="rate" stroke="#82ca9d" fillOpacity={0.6} fill="#82CA9D" />
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</div>
		)
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
			await axios.post('https://menuvox.fr:8081/ratesLogs/' + month, { jwt: JSON.parse(window.localStorage.getItem('jwt') as string) }).then(res => {
				resolve(res.data.data);
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
					setView(
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
		refresh(new Date().getMonth() + 1);
		// Don't pass any arg that need the "RefreshComp" component, to prevent infinite refresh
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


	return View;
}
export default ViewAndNumber;