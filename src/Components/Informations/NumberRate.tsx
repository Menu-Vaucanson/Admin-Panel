import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';

import RefreshComp, { startRefreshAnimation, stopRefreshAnimation } from './RefreshComp';
import MonthComp from './CalendarComp';

function NumberRate() {

	const color: string = '#4775FF';

	const Months = ['Décembre', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre'];

	const [Rate, setRate] = useState(
		<div className='ChartContainer'>
			<RefreshComp callback={refresh} pingColor={color} />
			<div className='ChartError'>Récupération des données...</div >
		</div>
	);

	function drawData(dataset) {
		const dateToText: Array<string> = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
		const CustomTooltip = ({ active, payload }) => {
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
				<MonthComp callback={refresh} />
				<div className='PageTitle'>
					Nombres de note
				</div>
				<div className='ChartContainer'>
					<ResponsiveContainer width="100%" height="89%">
						<AreaChart
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
							<XAxis dataKey={(v) => new Date(v.Date).getDate()} style={{ 'color': 'lime' }} tick={{ fill: '#F5FEF5' }} tickLine={{ stroke: '#F5FEF5' }} />
							<YAxis dataKey="Number" tick={{ fill: '#F5FEF5' }} tickLine={{ stroke: '#F5FEF5' }} />
							<Tooltip cursor={false} content={<CustomTooltip />} />
							<Area type="monotone" dataKey="Number" stroke="#4775FF" fillOpacity={1} fill="url(#ColorNumber)" />
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</div>
		)
	}
	function getData(month: number) {
		return new Promise(async (resolve) => {
			const D: Date = new Date();
			await axios.post('https://menuvox.fr:8081/rates/' + month, { jwt: JSON.parse(window.localStorage.getItem('jwt') as string) }).then(res => {
				let dataset: Array<{ Date: Date, Number: number }> = []
				res.data.data.forEach(element => {
					const date = new Date(D.getFullYear(), month - 1, element[0]);
					let number = element[1].length;
					dataset.push({ Date: date, Number: number })
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

	function refresh(month?) {
		startRefreshAnimation();
		if (typeof month == 'undefined') {
			month = new Date().getMonth() + 1;
		}
		return getData(month).then(data => {
			stopRefreshAnimation();
			if (data) {
				if (data === 404) {
					setRate(
						<div className='ChartContainer'>
							<RefreshComp callback={refresh} pingColor={color} />
							<MonthComp callback={refresh} />
							<div className='ChartError'>
								Aucune donnée n'est disponible pour {Months[month]}
							</div>
						</div>
					);
				} else {
					setRate(drawData(data));
				}
			} else {
				setRate(
					<div className='ChartContainer'>
						<RefreshComp callback={refresh} pingColor={color} />
						<div className='ChartError'>Une erreur est survenue</div>
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