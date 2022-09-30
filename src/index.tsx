import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
// @ts-ignore
import Logo from './Assets/Logo.svg';
import './Stylesheets/index.css';
import Main from './Components/Main';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const url: string = 'https://menuvox.fr:8081';

function Send(token: string) {
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

	const oldToken: string = JSON.parse(window.localStorage.getItem('jwt') as string);

	function LoginPageComp() {
		return (
			<div className='LoginPage'>
				<div className='LoginTitle'>Bienvenue à l'administration de Menu Vaucanson</div>
				<img className='LoginLogo' src={Logo} alt='Logo' />
				<input onKeyUp={(e) => {
					if (e.key === 'Enter') click();
				}} type="password" placeholder='Mot de passe' id='password'></input>
				{LoginError}
				<div className='LoginButton' onClick={click}>Se connecter</div>
			</div>
		);
	}

	if (oldToken) {
		Send(oldToken).then(res => {
			if (res) {
				root.render(
					<BrowserRouter>
						<Main />
					</BrowserRouter >
				);
			} else {
				root.render(
					<LoginPageComp />
				);
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
		const token: string = (document.getElementById('password') as HTMLInputElement).value;
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
		<LoginPageComp />
	);
}

root.render(
	<LoginPage />
);