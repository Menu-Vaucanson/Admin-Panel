import Refresh from '../../Assets/arrow.svg';
import { useState } from 'react';
function stopRefreshAnimation() {
	document.getElementById('RefreshButton').className = 'refreshIcon';
	document.getElementById('ping').className = 'ping Animate';
	sleep(3000, () => (document.getElementById('ping').className = 'ping stopAnimate'))
}

async function sleep(milliseconds, callback) {
	await new Promise(resolve => setTimeout(resolve, milliseconds));
	callback();
}

function startRefreshAnimation() {
	document.getElementById('RefreshButton').className = 'refreshIcon rotate';
}

function RefreshComp({ callback }) {
	const [ping, setPing] = useState(
		<div className='ping' id='ping'>
			<div className='pingText'>fait en 0 ms</div>
		</div>
	);

	function click() {
		const timestart = new Date();
		startRefreshAnimation();
		callback().then(() => {
			stopRefreshAnimation();
			printPing(timestart, new Date(), setPing);
		})
	}

	return (
		<div>
			<img src={Refresh} alt='Rafraichir' className='refreshIcon' onClick={click} id='RefreshButton' />
			{ping}
		</div>
	);
}


function printPing(time1, time2, setPing) {
	const ping = new Date(time2).getTime() - new Date(time1).getTime();
	setPing(
		<div className='ping' id='ping'><div className='pingText'>fait en {ping} ms</div></div>
	)
}

export { stopRefreshAnimation, startRefreshAnimation };
export default RefreshComp;