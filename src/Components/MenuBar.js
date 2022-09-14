import { Link } from 'react-router-dom';

import Logo from '../Assets/Logo.png';

function MenuBar() {
	return (
		<div className="MenuBar">
			<Link to='/' className='MenuBarTitle'>Menu Vaucanson</Link>
			<img className='MenuLogo' src={Logo} alt='Logo' />
		</div >
	)
}



export default MenuBar;