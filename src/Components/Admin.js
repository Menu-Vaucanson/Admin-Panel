import { Link } from 'react-router-dom';

function Admin() {
	return (
		<div className="Admin">
			Bienvenue sur l'Admin Panel
			<div className='AdminBoxes'>
				<Link to="/NewMenu" className="AdminBox green">Créer un menu</Link>
				<Link to="/EditMenu" className="AdminBox blue">Modifier un menu</Link>
				<Link to="/DeleteMenu" className="AdminBox red">Supprimer un menu</Link>
			</div>
		</div >
	);
}

export default Admin;