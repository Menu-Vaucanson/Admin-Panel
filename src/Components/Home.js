import { Link } from 'react-router-dom';

function Home() {
	return (
		<div className="Home">
			<div className="PageTitle">Bienvenue</div>
			<div className="HomeBoxes">
				<Link to='Infos' className='homeButtons'>Informations</Link>
				<Link to='Admin' className='homeButtons'>Administration</Link>
			</div>
		</div >
	)
}
export default Home;