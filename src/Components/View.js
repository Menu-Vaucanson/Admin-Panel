import axios from 'axios';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

function getData() {
	return new Promise(async (resolve) => {
		await axios.post('https://menuvox.fr:8081/logs/9', { jwt: JSON.parse(window.localStorage.getItem('jwt')) }).then(res => {
			const dataset = new Map()
			res.data.data.forEach(element => {
				const date = new Date(element.date).getFullYear() + '/' + new Date(element.date).getMonth() + '/' + new Date(element.date).getDate();
				if (dataset.get(date)) {
					dataset.set(date, parseInt(dataset.get(date)) + 1);
				} else {
					dataset.set(date, 1);
				}
			});
			console.log(Array.from(dataset));
			resolve(Array.from(dataset));
		});
	});
}

function drawData(dataset) {

	const CustomTooltip = ({ active, payload }) => {
		if (active && payload && payload.length) {
			const date = new Date(payload[0].payload.Date);
			const value = payload[0].payload.Number;
			return (
				<div className="custom-tooltip">
					{`${date.getFullYear()}/${date.getMonth()}/${date.getDay()} : ${value}`}
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
			{/* 100-4.5-4.5-2 */}
			<ResponsiveContainer width="100%" height="89%">
				<LineChart
					data={dataset}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray="10 10" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip content={<CustomTooltip />} />
					<Line type="monotone" dataKey="Date" stroke="#08A47C" />
					<Line strokeWidth={3} type="monotone" dataKey="Number" stroke="#08A47C" dot={{ strokeWidth: 3 }} />
				</LineChart>
			</ResponsiveContainer>
		</>
	)
}

function View() {
	const [View, setView] = useState(<div>Récuperation des données...</div>);

	useEffect(() => {
		getData().then(test => {
			setView(drawData(test));
		})
	}, [setView]);


	return View;
}

export default View;