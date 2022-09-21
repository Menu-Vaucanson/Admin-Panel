import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

function VieuAndNumber() {
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
			<>
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
							<XAxis dataKey={(v) => new Date(v.date).toLocaleDateString()} style={{ 'color': 'lime' }} tick={{ fill: '#F5FEF5' }} tickLine={{ stroke: '#F5FEF5' }} />
							<YAxis />
							<Tooltip content={<CustomTooltip />} />
							<Area type="monotone" dataKey="view" stroke="#8884d8" fillOpacity={0.8} fill="#8884d8" />
							<Area type="monotone" dataKey="rate" stroke="#82ca9d" fillOpacity={0.8} fill="#82ca9d" />
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</>
		)
	}

	const [View, setView] = useState(
		<div className='ChartContainer'>
			<div className='ChartError'>Récuperation des données...</div >
		</div>
	);
	useEffect(() => {
		function getData() {
			return new Promise(async (resolve) => {
				const D = new Date();
				await axios.post('https://menuvox.fr:8081/ratesLogs/' + (D.getMonth() + 1), { jwt: JSON.parse(window.localStorage.getItem('jwt')) }).then(res => {
					resolve(res.data.data);
				}).catch(err => {
					console.log(err);
					resolve(null);
				});
			});
		}
		getData().then(data => {
			if (data) {
				setView(
					drawData(data)
				)
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
export default VieuAndNumber;