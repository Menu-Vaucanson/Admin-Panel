import axios from 'axios';
import { useState, useEffect } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
function Platform() {
	function drawData(dataSet) {
		const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

		const RADIAN = Math.PI / 180;
		const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
			const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
			const x = cx + radius * Math.cos(-midAngle * RADIAN);
			const y = cy + radius * Math.sin(-midAngle * RADIAN);

			return (
				<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
					{`${(percent * 100).toFixed(0)}%`}
				</text>
			);
		};
		return (
			<div className='Chart'>
				<div className='PageTitle'>
					Nombre de vue
				</div>
				<div className='ChartContainer'>
					<ResponsiveContainer width="100%" height="100%">
						<PieChart>
							<Pie
								data={dataSet}
								cx="50%"
								cy="50%"
								labelLine={false}
								label={renderCustomizedLabel}
								outerRadius={80}
								fill="#8884d8"
								dataKey="value"
							>
								{dataSet.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
								))}
							</Pie>
						</PieChart>
					</ResponsiveContainer>
				</div>
			</div>
		);
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
				await axios.post('https://menuvox.fr:8081/logs/' + (D.getMonth() + 1), { jwt: JSON.parse(window.localStorage.getItem('jwt')) }).then(res => {
					let pc = 0;
					let mobile = 0;
					let other = 0;
					res.data.data.forEach(element => {
						if (typeof element.pc != 'undefined' && element.pc) {
							pc++;
						} else if (typeof element.pc != 'undefined' && !element.pc) {
							mobile++;
						} else {
							other++;
						}
					});
					const dataSet = [{ name: 'pc', value: pc }, { name: 'mobile', value: mobile }, { name: 'autre', value: other }]
					resolve(dataSet);
				}).catch(err => {
					console.log(err);
					resolve(null);
				});
			});
		}
		getData().then(data => {
			if (data) {
				setView(drawData(data));
			} else {
				setView(
					<div className='ChartContainer'>
						<div className='ChartError'>Une erreur est survenue</div>
					</div>
				)
			}
		});
	}, [setView]);


	return View;
}
export default Platform;