import { Link } from 'react-router-dom';

function Home() {
	return (
		<div className="Home">
			<div className="PageTitle">Bienvenue</div>
			<div className="HomeBoxes">
				<Link to='Infos' className='homeButtons yellow'>Informations</Link>
				<Link to='Admin' className='homeButtons blue'>Administration</Link>
			</div>
		</div >
	);
}
export default Home;