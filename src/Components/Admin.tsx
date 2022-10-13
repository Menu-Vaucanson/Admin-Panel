import { Link } from 'react-router-dom';

function Admin() {
	return (
		<div className="Home">
			<div className="PageTitle">Administration</div>
			<div className='HomeBoxes'>
				<Link to="/NewMenu" className="homeButtons green">Créer un menu</Link>
				<Link to="/DeleteMenu" className="homeButtons red">Supprimer un menu</Link>
			</div>
		</div >
	);
}

export default Admin;