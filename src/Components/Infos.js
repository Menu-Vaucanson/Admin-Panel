import { Link } from 'react-router-dom';
function Infos() {
	return (
		<div className="Info">
			<div className="PageTitle">Fréquentation</div>
			<div className="HomeBoxes">
				<Link to='NumberRate' className='infosButons blue'>Nombre de note</Link>
				<Link to='AverageRate' className='infosButons yellow'>Moyenne des notes</Link>
				<Link to='View' className='infosButons green'>Visites</Link>
			</div>
		</div >
	)
}

export default Infos;