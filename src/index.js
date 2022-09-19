import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import Logo from './Assets/Logo.png';
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
	const [ButtonText, setButtonText] = useState('Se connecter');

	const oldToken = JSON.parse(window.localStorage.getItem('jwt'));

	Send(oldToken).then(res => {
		if (res) {
			root.render(
				<BrowserRouter>
					<Main />
				</BrowserRouter >
			);
		}
	})

	function click() {
		const token = document.getElementById('password').value;
		if (token === '') return;
		setButtonText('Connection...');
		Send(token).then(res => {
			if (res === true) {
				window.localStorage.setItem('jwt', JSON.stringify(token));
				root.render(
					<BrowserRouter>
						<Main />
					</BrowserRouter >
				)
			} else {
				setButtonText('Mauvais mot de passe');
			}
			setTimeout(() => {
				setButtonText('Connection');
			}, 1000);
		})
	}

	return (
		<div className='LoginPage'>
			<div className='LoginTitle'>Bienvenue a l'administration de Menu Vaucanson</div>
			<img className='LoginLogo' src={Logo} alt='Logo' />
			<input onKeyUp={(e) => {
				if (e.key === 'Enter') click();
			}} type="password" placeholder='Mot de passe' id='password'></input>
			<div className='LoginButton' onClick={click}>{ButtonText}</div>
		</div>
	);
}

root.render(
	<LoginPage />
)