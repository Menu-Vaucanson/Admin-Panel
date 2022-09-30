import axios from 'axios';
import React from 'react';
import { Line, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ComposedChart, CartesianGrid } from 'recharts';
import { useState, useEffect } from 'react';
import RefreshComp, { startRefreshAnimation, stopRefreshAnimation } from './RefreshComp';
import MonthComp from './CalendarComp';


function AverageRate() {

	const color: string = '#FFC482';

	const Months: Array<string> = ['Décembre', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre'];

	const [Rate, setRate] = useState(
		<div className='ChartContainer'>
			<RefreshComp callback={refresh} pingColor={color} />
			<div className='ChartError'>Récupération des données...</div >
		</div>
	);

	function drawData(dataset) {
		const CustomTooltip = ({ active, payload }) => {
			const dateToText: Array<string> = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
			if (active && payload && payload.length) {
				const date: Date = new Date(payload[0].payload.Date);
				const value: number = payload[0].payload.Average;
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
					Moyenne de note
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
							}}
						>
							<CartesianGrid strokeDasharray="10 10" />
							<XAxis dataKey={(v) => v = new Date(v.Date).getDate()} tick={{ fill: '#F5FEF5' }} tickLine={{ stroke: '#F5FEF5' }} />
							<YAxis dataKey="Average" tick={{ fill: '#F5FEF5' }} tickLine={{ stroke: '#F5FEF5' }} />
							<Tooltip cursor={false} content={<CustomTooltip />} />
							<Bar dataKey="Average" fill="#FFC482" />
							<Line type="monotone" dataKey="globalAvrage" stroke="#E74855" strokeWidth={4} dot={false} activeDot={false} />
						</ComposedChart>
					</ResponsiveContainer>
					<div className='legend'><div className='legendTickLine'></div>Moyenne : {dataset[0].globalAvrage}</div>
				</div>
			</div>
		)
	}

	function getData(month: string | number) {
		return new Promise(async (resolve) => {
			const D: Date = new Date();
			await axios.post('https://menuvox.fr:8081/rates/' + month, { jwt: JSON.parse(window.localStorage.getItem('jwt') as string) }).then(res => {
				let dataset: Array<{ globalAvrage?, Date?, Average?}> = [];
				let averageMonth: number = 0;
				let numberAvrage: number = 0;
				res.data.data.forEach(element => {
					const date: Date = new Date(D.getFullYear(), D.getMonth(), element[0]);
					let average: number = 0
					element[1].forEach(rate => {
						average += rate.rate;
					});
					if (average) {
						average = parseFloat((average / element[1].length).toFixed(1));
					}
					dataset.push({ Date: date, Average: average });
					averageMonth += parseFloat(average.toFixed(2));
					// to fixed is unfunctional in this place
					numberAvrage++;

				})
				averageMonth = averageMonth / numberAvrage;
				dataset.forEach(element => {
					element.globalAvrage = parseFloat(averageMonth.toFixed(2));
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
				)
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