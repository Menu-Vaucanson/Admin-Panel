import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

function AverageRate() {
	const [Rate, setRate] = useState(
		<div className='ChartContainer'>
			<div className='ChartError'>Récuperation des données...</div >
		</div>
	);

	useEffect(() => {
		const dateToText = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
		function drawData(dataset) {
			const CustomTooltip = ({ active, payload }) => {
				if (active && payload && payload.length) {
					const date = new Date(payload[0].payload.Date);
					const value = payload[0].payload.Average;
					return (
						<div className="customTooltip">
							{`${dateToText[date.getDay()]} : ${value}`}
						</div>
					);
				}
				return null;
			};

			return (
				<>
					<div className='PageTitle'>
						Moyenne de note
					</div>
					<div className='ChartContainer'>
						<ResponsiveContainer width="100%" height="89%">
							<BarChart width={150} height={40} data={dataset}>
								<Bar dataKey="Average" fill="#FFC482" />
								<XAxis dataKey={(v) => v = new Date(v.Date).toLocaleDateString()} tick={{ fill: '#F5FEF5' }} tickLine={{ stroke: '#F5FEF5' }} />
								<YAxis dataKey="Average" tick={{ fill: '#F5FEF5' }} tickLine={{ stroke: '#F5FEF5' }} />
								<Tooltip cursor={false} content={<CustomTooltip />} />
							</BarChart>
						</ResponsiveContainer>
					</div>
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
						let average = 0
						element[1].forEach((rate, i) => {
							if (!i) return;
							average += rate.rate;
						});
						if (average) {
							average = (average / element[1].length).toFixed(1);
						}
						dataset.push({ Date: date, Average: average })

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
	}, [setRate]);


	return Rate;
}

export default AverageRate;