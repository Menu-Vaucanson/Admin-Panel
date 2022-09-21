import { Link } from 'react-router-dom';

import Logo from '../Assets/Logo.png';
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