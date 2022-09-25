import Refresh from '../../Assets/arrow.svg';
import { useState } from 'react';
function stopRefreshAnimation() {
	document.getElementById('RefreshButton').className = 'refreshIcon';
}

function startRefreshAnimation() {
	document.getElementById('RefreshButton').className = 'refreshIcon rotate';
}

function RefreshComp({ callback, pingColor }) {
	const [ping, setPing] = useState(<div style={{ backgroundColor: pingColor }} id='ping' className='ping'>0ms</div>);

	function click() {
		const timestart = new Date();
		startRefreshAnimation();
		callback().then(() => {
			const ping = new Date().getTime() - timestart.getTime();
			setPing(
				<div style={{ backgroundColor: pingColor }} className='ping' id='ping'>{ping}ms</div>
			);
			const element = document.getElementById('ping');
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