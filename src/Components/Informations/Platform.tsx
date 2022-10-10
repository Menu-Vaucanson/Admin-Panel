import axios from 'axios';
import { useState, useEffect } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';

import RefreshComp, { startRefreshAnimation, stopRefreshAnimation } from './RefreshComp';
import MonthComp from './MonthComp';

function Platform() {
	const color = '#08A47C';

	const Months = ['Décembre', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre'];

	function renderActiveShape(props: any) {
		const RADIAN = Math.PI / 180;
		const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
		const sin = Math.sin(-RADIAN * midAngle);
		const cos = Math.cos(-RADIAN * midAngle);
		const sx = cx + (outerRadius + 10) * cos;
		const sy = cy + (outerRadius + 10) * sin;
		const mx = cx + (outerRadius + 30) * cos;
		const my = cy + (outerRadius + 30) * sin;
		const ex = mx + (cos >= 0 ? 1 : -1) * 22;
		const ey = my;
		const textAnchor = cos >= 0 ? 'start' : 'end';

		return (
			<g>
				<text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
					{payload.name}
				</text>
				<Sector
					cx={cx}
					cy={cy}
					innerRadius={innerRadius}
					outerRadius={outerRadius}
					startAngle={startAngle}
					endAngle={endAngle}
					fill={fill}
				/>
				<Sector
					cx={cx}
					cy={cy}
					startAngle={startAngle}
					endAngle={endAngle}
					innerRadius={outerRadius + 6}
					outerRadius={outerRadius + 10}
					fill={fill}
				/>
				<path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
				<circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
				<text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#F5FEF5">{value}</text>
				<text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#F5FEF5">
					{(percent * 100).toFixed(2)}%
				</text>
			</g>
		);
	};

	function DrawData({ data }) {
		const [ActiveIndex, setActiveIndex] = useState(0);
		function onPieEnter(_: any, index: any) {
			setActiveIndex(index);
		};

		return (
			<div className='Chart'>
				<RefreshComp callback={refresh} pingColor={color} />
				<MonthComp callback={refresh} />
				<div className='PageTitle'>
					Plateformes
				</div >
				<div className='ChartContainer'>
					<ResponsiveContainer width="800%" height="100%">
						<PieChart>
							<Pie
								activeIndex={ActiveIndex}
								activeShape={renderActiveShape}
								data={data}
								innerRadius={'60%'}
								outerRadius={'70%'}
								fill="#08A47C"
								dataKey="value"
								onMouseEnter={onPieEnter}
							/>
						</PieChart>
					</ResponsiveContainer>
				</div>
			</div>
		);
	}

	const [View, setView] = useState(
		<div className='ChartContainer'>
			<RefreshComp callback={refresh} pingColor={color} />
			<div className='ChartError'>Récupération des données...</div >
		</div>
	);

	function getData(month: number) {
		return new Promise(async (resolve) => {
			await axios.post('https://menuvox.fr:8081/logs/' + month, { jwt: JSON.parse(window.localStorage.getItem('jwt') as string) }).then(res => {
				const data: Array<{ name: string, value: number }> = [
					{
						name: 'PC',
						value: 0
					}, {
						name: 'Mobile',
						value: 0
					}, {
						name: 'Autre',
						value: 0
					}
				];
				res.data.data.forEach((d: { pc: boolean; }) => {
					if (d.pc === true) {
						data[0].value++;
					} else if (d.pc === false) {
						data[1].value++;
					} else {
						data[2].value++;
					}
				});
				resolve(data);
			}).catch(err => {
				console.log(err);
				resolve(err.request.status);
			});
		});
	}

	function refresh(month: number) {
		startRefreshAnimation();
		return getData(month).then(data => {
			stopRefreshAnimation();
			if (data) {
				if (data === 404) {
					setView(
						<div className='ChartContainer'>
							<RefreshComp callback={refresh} pingColor={color} />
							<MonthComp callback={refresh} />
							<div className='ChartError'>
								Aucune donnée n'est disponible pour {Months[month]}
							</div>
						</div>
					);
				} else {
					setView(<DrawData data={data} />);
				}
			} else {
				setView(
					<div className='ChartContainer'>
						<RefreshComp callback={refresh} pingColor={color} />
						<div className='ChartError'>Une erreur est survenue</div>
					</div>
				);
			}
		});
	}

	useEffect(() => {
		refresh(new Date().getMonth() + 1);
		// Don't pass any arg that need the "RefreshComp" component, to prevent infinite refresh
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return View;
}




export default Platform;