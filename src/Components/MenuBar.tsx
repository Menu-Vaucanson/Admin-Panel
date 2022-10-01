import { Link } from 'react-router-dom';
import React from 'react';
// @ts-ignore
import Logo from '../Assets/Logo.svg';
// @ts-ignore
import Logout from '../Assets/logout.svg';

function MenuBar() {
	function click() {
		window.localStorage.clear();
		window.location.href = '/';
	}

	return (
		<div className="MenuBar">
			<img src={Logout} alt='Déconnexion' onClick={click} className='LogoutButton' />
			<Link to='/' className='MenuBarTitle'>Menu Vaucanson Admin</Link>
			<img className='MenuLogo' src={Logo} alt='Logo' />
		</div >
	);
}



export default MenuBar;