import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import Logo from './Assets/Logo.png';
import './Stylesheets/index.css';
import Main from './Components/Main';

const root = ReactDOM.createRoot(document.getElementById('root'));

// if (document.getElementById('nameOfSession').value === '') {
// 	StateEdition(setState, 'Tu dois indiquer un nom', 'error');
// }

function Index() {
	const [index, setIndex] = useState(
		<div className='Index'>
			<div className='passwordText'>Bienvenue à l'administration <br /> du Menu Vaucanson</div>
			<img className='PasswordLogo' src={Logo} alt='Logo' />
			<div className='passwordBox'>
				<input type='password' className='FormInput' placeholder='Mot de Passe' id='password' />
				<div className='conectButon' onClick={validatePassword}>Connexion</div>
			</div>
		</div >
	);
	function validatePassword() {
		const token = document.getElementById('password').value;
		if (TestToken(token)) {
			setIndex(
				<BrowserRouter>
					<Main />
				</BrowserRouter >
			)
		}
	}
	if (window.localStorage.getItem('token') && TestToken(window.localStorage.getItem('token'))) {
		setIndex(
			<BrowserRouter>
				<Main />
			</BrowserRouter >
		)
	}
	return index;
}

root.render(
	<Index />
);

function TestToken(token) {
	return true
}