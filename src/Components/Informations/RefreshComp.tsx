import { Refresh } from '../../Assets/arrow.svg';
import React from 'react';
import { useState } from 'react';
function stopRefreshAnimation() {
	(document.getElementById('RefreshButton') as HTMLElement).className = 'refreshIcon';
}

function startRefreshAnimation() {
	(document.getElementById('RefreshButton') as HTMLElement).className = 'refreshIcon rotate';
}

function RefreshComp({ callback, pingColor }) {
	const [ping, setPing] = useState(<div style={{ backgroundColor: pingColor }} id='ping' className='ping'>0ms</div>);

	function click() {
		const timestart: Date = new Date();
		startRefreshAnimation();
		callback().then(() => {
			const ping: number = new Date().getTime() - timestart.getTime();
			setPing(
				<div style={{ backgroundColor: pingColor }} className='ping' id='ping'>{ping}ms</div>
			);
			const element: HTMLElement = document.getElementById('ping') as HTMLElement;
			element.className = 'ping';
			void element.offsetWidth;
			element.className = 'ping PingAnimate';
			stopRefreshAnimation();
		});
	}

	return (
		<div>
			<img src={Refresh} alt='Rafraichir' className='refreshIcon' onClick={click} id='RefreshButton' />
			{ping}
		</div>
	);
}



export { stopRefreshAnimation, startRefreshAnimation };
export default RefreshComp;