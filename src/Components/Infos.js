import { Link } from 'react-router-dom';
function Infos() {
	return (
		<div className="Info">
			<div className="PageTitle">Fréquentation</div>
			<div className="HomeBoxes">
				<Link to='NumberRate' className='infoBox blue'><div className='infosButons'>Nombre de note</div></Link>
				<Link to='AverageRate' className='infoBox yellow'><div className='infosButons'>Moyenne des notes</div></Link>
				<Link to='View' className='infoBox green'><div className='infosButons'>Visites</div></Link>
				<Link to='VieuAndNumber' className='infoBox red'> <div className='infosButons'> Cumule vue et note</div></Link>
				<Link to='Platform' className='infoBox blue'><div className='infosButons'>platforme</div></Link>
			</div >
		</div >
	)
}

export default Infos;