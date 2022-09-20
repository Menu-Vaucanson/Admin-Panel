import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import axios from 'axios';

function NumberRate() {

	const [Rate, setRate] = useState(
		<div className='ChartContainer'>
			<div className='ChartEror'>Récuperation des données...</div >
		</div>
	);

	useEffect(() => {
		const dateToText = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
		function drawData(dataset) {

			const CustomTooltip = ({ active, payload }) => {
				if (active && payload && payload.length) {
					const date = new Date(payload[0].payload.Date);
					const value = payload[0].payload.Number;
					return (
						<div className="customTooltip">
							{`${dateToText[date.getDay()]} : ${value}`}
						</div>
					);
				}
				return null;
			};
			console.log(dataset);
			return (
				<>
					<div className='PageTitle'>
						Nombre de note
					</div>
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
							<XAxis dataKey={(v) => new Date(v.Date).toLocaleDateString()} style={{ 'color': 'lime' }} tick={{ fill: '#F5FEF5' }} tickLine={{ stroke: '#F5FEF5' }} />
							<YAxis dataKey="Number" tick={{ fill: '#F5FEF5' }} tickLine={{ stroke: '#F5FEF5' }} />
							<Tooltip cursor={false} content={<CustomTooltip />} />
							<Area type="monotone" dataKey="Number" stroke="#4775FF" fillOpacity={1} fill="url(#ColorNumber)" />
						</AreaChart>
					</ResponsiveContainer>
				</>
			)
		}
		function getData() {
			return new Promise(async (resolve) => {
				const D = new Date();
				await axios.post('https://menuvox.fr:8081/rates/' + (D.getMonth() + 1), { jwt: JSON.parse(window.localStorage.getItem('jwt')) }).then(res => {
					let dataset = []
					res.data.data.forEach(element => {
						const date = new Date(D.getFullYear(), D.getMonth(), element[0]);
						let number = element[1].length;
						dataset.push({ Date: date, Number: number })

					})
					dataset.sort((a, b) => {
						const nameA = a.Date;
						const nameB = b.Date;
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
					resolve(null);
				});
			});
		}

		getData().then(data => {
			if (data) {
				setRate(drawData(data))
			} else {
				setRate(
					<div className='ChartContainer'>
						<div className='ChartError'>Une erreur est survenue</div>
					</div>
				)
			}
		});
	}, []);


	return Rate;
}

export default NumberRate