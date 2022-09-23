import Refresh from '../../Assets/arrow.svg';

function stopRefreshAnimation() {
	document.getElementById('RefreshButton').className = 'refreshIcon';
}

function startRefreshAnimation() {
	document.getElementById('RefreshButton').className = 'refreshIcon rotate';
}

function RefreshComp({ callback }) {

	function click() {
		startRefreshAnimation();
		callback().then(() => {
			stopRefreshAnimation();
		})
	}

	return (
		<img src={Refresh} alt='Rafraichir' className='refreshIcon' onClick={click} id='RefreshButton' />
	);
}

export { stopRefreshAnimation, startRefreshAnimation };
export default RefreshComp;