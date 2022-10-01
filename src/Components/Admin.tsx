import React from 'react';
import { Link } from 'react-router-dom';

function Admin() {
	return (
		<div className="Admin">
			Création
			<div className='AdminBoxes'>
				<Link to="/NewMenu" className="AdminBox green">Créer un menu</Link>
				<Link to="/DeleteMenu" className="AdminBox red">Supprimer un menu</Link>
			</div>
		</div >
	);
}

export default Admin;