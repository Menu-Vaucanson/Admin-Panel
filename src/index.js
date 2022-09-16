import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import './Stylesheets/index.css';

import Main from './Components/Main';

const root = ReactDOM.createRoot(document.getElementById('root'));
function Index() {
	const [index, setIndex] = useState(
		<div className='Index'>
			<div className='entrée le mot de passe'
		</div>
		// if (TestToken(window.localStorage.getItem(token))) {
		// 	return (
		// 		<BrowserRouter>
		// 			<Main />
		// 		</BrowserRouter >
		// 	)

		// }

	);
	return index;
}

root.render(
	<Index />
);

function TestToken(token) {
	return true
}