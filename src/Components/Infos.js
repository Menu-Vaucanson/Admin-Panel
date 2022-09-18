import { Link } from 'react-router-dom';
function Infos() {
	return (
		<div className="Info">
			<div className="PageTitle">Fréquentation</div>
			<div className="HomeBoxes">
				<Link to='Rate' className='infosButons blue'>Moyene de note</Link>
				<Link to='NumbeRate' className='infosButons yellow'>nombre de note</Link>
				<Link to='Vew' className='infosButons green'>visite</Link>
			</div>
		</div >
	)
}

export default Infos;