import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

function VieuAndNumber() {
	function drawData(dataset) {
		const dateToText = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
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
		return (
			<>
				<div className='PageTitle'>
					Nombre de note
				</div>
				<div className='ChartContainer'>
					<ResponsiveContainer width="100%" height="89%">
						<LineChart
							width={500}
							height={300}
							data={dataset}
							margin={{
								top: 5,
								right: 30,
								left: 20,
								bottom: 5,
							}}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey={(v) => new Date(v.Date).toLocaleDateString()} style={{ 'color': 'lime' }} tick={{ fill: '#F5FEF5' }} tickLine={{ stroke: '#F5FEF5' }} />
							<YAxis />
							<Tooltip />
							<Line type="monotone" dataKey="Number" stroke="#8884d8" activeDot={{ r: 8 }} />
							<Line type="monotone" dataKey="View" stroke="#82ca9d" activeDot={{ r: 8 }} />
						</LineChart>
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
		function find(array, query) {
			let index = null
			array.forEach((element, i) => {
				if (new Date(element.Date).toLocaleDateString() === query) {
					index = i;
				}
			});
			return index;
		}
		function getDataView() {
			return new Promise(async (resolve) => {
				const D = new Date();
				await axios.post('https://menuvox.fr:8081/logs/' + (D.getMonth() + 1), { jwt: JSON.parse(window.localStorage.getItem('jwt')) }).then(res => {
					let dataset = []
					res.data.data.forEach(element => {
						const date = new Date(element.date);
						const index = find(dataset, date.toLocaleDateString());
						if (index != null) {
							dataset[index].View = dataset[index].View + 1
						} else {
							dataset.push({ Date: date, View: 1 })
						}
					});
					resolve(Array.from(dataset));
				}).catch(err => {
					console.log(err);
					resolve(null);
				});
			});
		}
		//end of view
		function getDataNuberRate() {
			return new Promise(async (resolve) => {
				const D = new Date();
				await axios.post('https://menuvox.fr:8081/rates/' + (D.getMonth() + 1), { jwt: JSON.parse(window.localStorage.getItem('jwt')) }).then(res => {
					let dataset = []
					res.data.data.forEach(element => {
						const date = new Date(D.getFullYear(), D.getMonth(), element[0]);
						let number = element[1].length;
						dataset.push({ Date: date, Rate: number })

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
		function mix(dataset1, dataset2) {
			const final = []
			dataset1.forEach(element => {
				if (find(final, new Date(element.Date).toLocaleDateString()) === null) {
					final.push({
						Date: element.Date, View: element.View, Rate: 0
					})
				}
			})
			dataset2.forEach((element, i) => {
				if (find(final, new Date(element.Date).toLocaleDateString()) == null) {
					final.push({
						Date: element.Date, View: 0, Rate: element.Rate
					})
				} else {
					final[i].Rate = element.Rate;
				}
			})
			return final;
		}
		//end of numberOfRate
		getDataView().then(data => {
			if (data) {
				getDataNuberRate().then(data1 => {
					if (data1) {
						console.log(data, data1);
						const data2 = mix(data, data1);
						console.log(data2);
						setView(drawData(data2))
					} else {
						setView(
							<div className='ChartContainer'>
								<div className='ChartEror'>Une erreur est survenue dans la recuperation des note</div>
							</div>
						)
					}
				})
			} else {
				setView(
					<div className='ChartContainer'>
						<div className='ChartEror'>Une erreur est survenue dans la recuperation du nombre de vue</div>
					</div>
				)
			}
		});
	}, [setView]);
	return View;
}
export default VieuAndNumber;