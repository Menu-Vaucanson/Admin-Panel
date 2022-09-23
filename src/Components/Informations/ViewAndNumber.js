import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import RefreshComp, { startRefreshAnimation, stopRefreshAnimation } from './RefreshComp';
import MonthComp from './CalendarComp';

function ViewAndNumber() {
	const Months = ['Décembre', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre'];


	function drawData(dataset) {
		const dateToText = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
		const CustomTooltip = ({ active, payload }) => {
			if (active && payload && payload.length) {
				const date = new Date(payload[0].payload.date);
				let rate = payload[0].payload.rate;
				let view = payload[0].payload.view;
				if (typeof view == 'undefined') {
					view = '';
				} else {
					view = `vues: ${view}`;
				}
				if (typeof rate == 'undefined') {
					rate = '';
				} else {
					rate = `notes: ${rate} `
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
				<RefreshComp callback={refresh} />
				<MonthComp callback={refresh} />
				<div className='PageTitle'>
					Nombre de note
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
							<YAxis yAxisId="right" orientation="right" type="number" dataKey="rate" />
							<YAxis yAxisId="left" type="number" dataKey="view" />
							<Tooltip content={<CustomTooltip />} />
							<Area yAxisId="left" type="monotone" dataKey="view" stroke="#8884d8" fillOpacity={0.6} fill="#8884d8" />
							<Area yAxisId="right" type="monotone" dataKey="rate" stroke="#82ca9d" fillOpacity={0.6} fill="#82ca9d" />
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</div>
		)
	}

	const [View, setView] = useState(
		<div className='ChartContainer'>
			<RefreshComp callback={refresh} />
			<div className='ChartError'>Récuperation des données...</div >
		</div>
	);
	function getData(month) {
		return new Promise(async (resolve) => {
			await axios.post('https://menuvox.fr:8081/ratesLogs/' + month, { jwt: JSON.parse(window.localStorage.getItem('jwt')) }).then(res => {
				resolve(res.data.data);
			}).catch(err => {
				console.log(err);
				resolve(err.request.status);
			});
		});
	}

	function refresh(month) {
		startRefreshAnimation();
		if (typeof month == 'undefined') {
			month = new Date().getMonth() + 1;
		}
		return getData(month).then(data => {
			stopRefreshAnimation();
			if (data) {
				if (data === 404) {
					setView(
						<div className='ChartContainer'>
							<RefreshComp callback={refresh} />
							<MonthComp callback={refresh} />
							<div className='ChartError'>
								Aucune donnée n'est disponible pour {Months[month]}
							</div>
						</div>
					);
				} else {
					setView(drawData(data));
				}
			} else {
				setView(
					<div className='ChartContainer'>
						<RefreshComp callback={refresh} />
						<div className='ChartError'>Une erreur est survenue</div>
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
export default ViewAndNumber;