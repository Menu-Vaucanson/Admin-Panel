import { Link } from 'react-router-dom';
function Infos() {
	return (
		<div className="Info">
			<div className="PageTitle">Fréquentation</div>
			<div className="HomeBoxes">
				<Link to='rate' className='infosButons'>Moyene de note</Link>
				<Link to='numbeRate' className='infosButons'>nombre de note</Link>
				<Link to='vew' className='infosButons'>visite</Link>
			</div>
		</div >
	)
}

export default Infos;