import axios from 'axios';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';



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
			<>
				<div className='PageTitle'>
					Nombre de vue
				</div>
				<ResponsiveContainer width="100%" height="89%">
					<LineChart
						data={dataset}
						margin={{
							top: 5,
							bottom: 5,
							right: 30,
							left: 0
						}}
					>
						<CartesianGrid strokeDasharray="10 10" />
						<XAxis dataKey={(v) => v = new Date(v.Date).toLocaleDateString()} tick={{ fill: '#F5FEF5' }} tickLine={{ stroke: '#F5FEF5' }} />
						<YAxis dataKey="Number" tick={{ fill: '#F5FEF5' }} tickLine={{ stroke: '#F5FEF5' }} />
						<Tooltip content={<CustomTooltip />} />
						<Line type="monotone" dataKey="Date" stroke="#08A47C" />
						<Line strokeWidth={10} type="monotone" dataKey="Number" stroke="#08A47C" dot={{ strokeWidth: 1 }} />
					</LineChart>
				</ResponsiveContainer>
			</>
		)
	}
	const [View, setView] = useState(
		<div className='ChartContainer'>
			<div className='ChartEror'>Récuperation des données...</div >
		</div>
	);

	useEffect(() => {
		function getData() {
			return new Promise(async (resolve) => {
				await axios.post('https://menuvox.fr:8081/logs/9', { jwt: JSON.parse(window.localStorage.getItem('jwt')) }).then(res => {
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
		getData().then(data => {
			if (data) {
				setView(drawData(data))
			} else {
				setView(
					<div className='ChartContainer'>
						<div className='ChartEror'>Une erreur est survenue</div>
					</div>
				)
			}
		});
	}, [setView]);


	return View;
}

export default View;