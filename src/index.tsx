import axios from 'axios';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './Stylesheets/index.css';

import Logo from './Assets/Logo.svg';
import Main from './Components/Main';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const url = 'https://menuvox.fr:8081';


function LoginPage() {
	function Send(token: string): Promise<Array<any>> {
		return new Promise(resolve => {
			axios.post(`${url}/login`, { 'jwt': token }).catch(err => {
				console.error(err);
				resolve([false, err]);
			}).then(response => {
				if (typeof response == 'undefined') {
					resolve([false, response]);
				} else {
					resolve([true, response]);
				}
			});
		});
	}

	const [LoginError, setLoginError] = useState('');

	const oldToken = JSON.parse(window.localStorage.getItem('jwt') as string);

	function LoginPageComp() {
		return (
			<div className='LoginPage'>
				<div className='LoginTitle'>Bienvenue à l'administration de Menu Vaucanson</div>
				<img className='LoginLogo' src={Logo} alt='Logo' />
				<input onKeyUp={(e) => {
					if (e.key === 'Enter') click();
				}} type="password" placeholder='Mot de passe' id='password'></input>
				<div className='LoginError'>{LoginError}</div>
				<div className='LoginButton' onClick={click}>Se connecter</div>
			</div>
		);
	}

	if (oldToken) {
		Send(oldToken).then(Response => {
			if (Response[0]) {
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
		const token = (document.getElementById('password') as HTMLInputElement).value;
		if (token === '') return;
		setLoginError('Connexion en cours');
		Send(token).then(Response => {
			if (Response[0]) {
				window.localStorage.setItem('jwt', JSON.stringify(token));
				root.render(
					<BrowserRouter>
						<Main />
					</BrowserRouter >
				);
			} else {
				if (Response[1].code === 'ERR_NETWORK') {
					setLoginError('Pas de connexion');
				} else if (Response[1].code === 'ERR_BAD_REQUEST') {
					setLoginError('Mauvais mot de passe');
				} else {
					setLoginError('Une erreur est survenue');
				}
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