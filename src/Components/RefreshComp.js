import Refresh from '../Assets/arrow.svg';

function RefreshComp({ callback }) {
	function click() {
		const element = document.getElementById('RefreshButton');
		element.className = 'refreshIcon rotate';
		callback().then(() => {
			element.className = 'refreshIcon';
		});
	}

	return (
		<img src={Refresh} alt='Rafraichir' className='refreshIcon' onClick={click} id='RefreshButton' />
	);
}

export default RefreshComp;