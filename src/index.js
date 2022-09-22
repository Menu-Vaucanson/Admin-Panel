import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import Logo from './Assets/Logo.svg';
import './Stylesheets/index.css';
import Main from './Components/Main';

const root = ReactDOM.createRoot(document.getElementById('root'));

const url = 'https://menuvox.fr:8081';

function Send(token) {
	return new Promise(resolve => {
		axios.post(`${url}/login`, { 'jwt': token }).catch(err => {
			console.log(err);
			resolve(null);
		}).then(response => {
			if (typeof response == 'undefined') {
				resolve(null);
			} else {
				resolve(true);
			}
		});
	});
}

function LoginPage() {
	const [LoginError, setLoginError] = useState(<div className='LoginError'></div>);

	const oldToken = JSON.parse(window.localStorage.getItem('jwt'));

	if (oldToken) {
		Send(oldToken).then(res => {
			if (res) {
				root.render(
					<BrowserRouter>
						<Main />
					</BrowserRouter >
				);
			} else {
				<div className='LoginPage'>
					<div className='LoginTitle'>Bienvenue a l'administration de Menu Vaucanson</div>
					<img className='LoginLogo' src={Logo} alt='Logo' />
					<input onKeyUp={(e) => {
						if (e.key === 'Enter') click();
					}} type="password" placeholder='Mot de passe' id='password'></input>
					{LoginError}
					<div className='LoginButton' onClick={click}>Se connecter</div>
				</div>
			}
		});
		return (
			<div className='LoginPage'>
				<div className='PageTitle'>
					Connexion...
				</div>
			</div>
		);
	}

	function click() {
		const token = document.getElementById('password').value;
		if (token === '') return;
		setLoginError(<div className='LoginError'>Connexion...</div>);
		Send(token).then(res => {
			if (res === true) {
				window.localStorage.setItem('jwt', JSON.stringify(token));
				root.render(
					<BrowserRouter>
						<Main />
					</BrowserRouter >
				);
			} else {
				setLoginError(<div className='LoginError'>Mauvais mot de passe</div>);
			}
		});
	}

	return (
		<div className='LoginPage'>
			<div className='LoginTitle'>Bienvenue a l'administration de Menu Vaucanson</div>
			<img className='LoginLogo' src={Logo} alt='Logo' />
			<input onKeyUp={(e) => {
				setLoginError(<div className='LoginError'></div>);
				if (e.key === 'Enter') click();
			}} type="password" placeholder='Mot de passe' id='password'></input>
			{LoginError}
			<div className='LoginButton' onClick={click}>Se connecter</div>
		</div>
	);
}

root.render(
	<LoginPage />
);