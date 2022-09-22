import axios from 'axios';
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

import RefreshComp from './RefreshComp';

function View() {
	function find(array, query) {
		let index = null
		array.forEach((element, i) => {
			if (new Date(element.Date).toLocaleDateString() === query) {
				index = i;
			}
		});
		return index;
	}

	function drawData(dataset) {
		const CustomTooltip = ({ active, payload }) => {
			if (active && payload && payload.length) {
				const date = new Date(payload[0].payload.Date);
				const value = payload[0].payload.Number;
				return (
					<div className="customTooltip">
						{`${date.toLocaleDateString()} : ${value}`}
					</div>
				);
			}
			return null;
		};

		return (
			<div className='Chart'>
				<RefreshComp callback={refresh} />
				<div className='PageTitle'>
					Nombre de vue
				</div>
				<div className='ChartContainer'>
					<ResponsiveContainer width="100%" height="89%">
						<AreaChart
							data={dataset}
							margin={{
								top: 5,
								bottom: 5,
								right: 30,
								left: 0
							}}
						>
							<defs>
								<linearGradient id="ColorNumber" x1="0" y1="0" x2="0" y2="2">
									<stop offset="95%" stopColor="#08A47C" stopOpacity={0} />
								</linearGradient>

							</defs>
							<CartesianGrid strokeDasharray="10 10" />
							<XAxis dataKey={(v) => v = new Date(v.Date).toLocaleDateString()} tick={{ fill: '#F5FEF5' }} tickLine={{ stroke: '#F5FEF5' }} />
							<YAxis dataKey="Number" tick={{ fill: '#F5FEF5' }} tickLine={{ stroke: '#F5FEF5' }} />
							<Tooltip content={<CustomTooltip />} />
							<Area strokeWidth={10} type="monotone" dataKey="Number" stroke="#08A47C" dot={{ strokeWidth: 1 }} fillOpacity={1} fill="url(#ColorNumber)" />
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</div>
		)
	}
	const [View, setView] = useState(
		<div className='ChartContainer'>
			<div className='ChartError'>Récuperation des données...</div >
		</div>
	);

	function getData() {
		return new Promise(async (resolve) => {
			const D = new Date();
			await axios.post('https://menuvox.fr:8081/logs/' + (D.getMonth() + 1), { jwt: JSON.parse(window.localStorage.getItem('jwt')) }).then(res => {
				let dataset = []
				res.data.data.forEach(element => {
					const date = new Date(element.date);
					const index = find(dataset, date.toLocaleDateString());
					if (index != null) {
						dataset[index].Number = dataset[index].Number + 1
					} else {
						dataset.push({ Date: date, Number: 1 })
					}
				});
				resolve(Array.from(dataset));
			}).catch(err => {
				console.log(err);
				resolve(null);
			});
		});
	}

	function refresh() {
		return getData().then(data => {
			if (data) {
				setView(drawData(data));
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

export default View;