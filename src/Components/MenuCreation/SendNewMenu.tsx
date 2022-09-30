import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const url = 'https://menuvox.fr:8081/';

function setDatas() {
	const date = JSON.parse(window.sessionStorage.getItem('date') as string);

	const dish1 = JSON.parse(window.sessionStorage.getItem('dish1') as string);
	const dish2 = JSON.parse(window.sessionStorage.getItem('dish2') as string);
	const dish3 = JSON.parse(window.sessionStorage.getItem('dish3') as string);
	const dish4 = JSON.parse(window.sessionStorage.getItem('dish4') as string);
	const dish1e = JSON.parse(window.sessionStorage.getItem('dish1e') as string);
	const dish2e = JSON.parse(window.sessionStorage.getItem('dish2e') as string);
	const dish3e = JSON.parse(window.sessionStorage.getItem('dish3e') as string);
	const dish4e = JSON.parse(window.sessionStorage.getItem('dish4e') as string);

	let isErrored1 = JSON.parse(window.sessionStorage.getItem('isErrored1') as string);
	let isErrored2 = JSON.parse(window.sessionStorage.getItem('isErrored2') as string);
	if (isErrored1 == null) {
		isErrored1 = false;
	}
	if (isErrored2 == null) {
		isErrored2 = false;
	}

	const error1 = JSON.parse(window.sessionStorage.getItem('error1') as string);
	const error2 = JSON.parse(window.sessionStorage.getItem('error2') as string);

	const theme1 = JSON.parse(window.sessionStorage.getItem('dish1Style') as string);
	const theme2 = JSON.parse(window.sessionStorage.getItem('dish2Style') as string);
	const theme3 = JSON.parse(window.sessionStorage.getItem('dish3Style') as string);
	const theme4 = JSON.parse(window.sessionStorage.getItem('dish4Style') as string);
	const theme1Dark = JSON.parse(window.sessionStorage.getItem('dish1Styledark') as string);
	const theme2Dark = JSON.parse(window.sessionStorage.getItem('dish2Styledark') as string);
	const theme3Dark = JSON.parse(window.sessionStorage.getItem('dish3Styledark') as string);
	const theme4Dark = JSON.parse(window.sessionStorage.getItem('dish4Styledark') as string);

	const theme1e = JSON.parse(window.sessionStorage.getItem('dish1eStyle') as string);
	const theme2e = JSON.parse(window.sessionStorage.getItem('dish2eStyle') as string);
	const theme3e = JSON.parse(window.sessionStorage.getItem('dish3eStyle') as string);
	const theme4e = JSON.parse(window.sessionStorage.getItem('dish4eStyle') as string);
	const theme1eDark = JSON.parse(window.sessionStorage.getItem('dish1eStyledark') as string);
	const theme2eDark = JSON.parse(window.sessionStorage.getItem('dish2eStyledark') as string);
	const theme3eDark = JSON.parse(window.sessionStorage.getItem('dish3eStyledark') as string);
	const theme4eDark = JSON.parse(window.sessionStorage.getItem('dish4eStyledark') as string);

	const d = date.split('-');
	const data = {
		error: isErrored1 ? 1 : 0,
		errorEvening: isErrored2 ? 1 : 0,
		date: new Date(d[0], d[1] - 1, d[2]).toLocaleDateString(),
		menu: [{
			"name": "",
			"content": "",
			"style": "",
			"styleDark": ""
		}],
		errorMessage: "",
		evening: [{
			"name": "",
			"content": "",
			"style": "",
			"styleDark": ""
		}],
		errorEveningMessage: ""
	};

	if (!isErrored1) {
		data.menu = [
			{
				"name": "Entrée",
				'content': dish1,
				"style": "",
				"styleDark": ""
			},
			{
				"name": "Plat",
				'content': dish2,
				"style": "",
				"styleDark": ""
			},
			{
				"name": "Légume",
				'content': dish3,
				"style": "",
				"styleDark": ""
			},
			{
				"name": "Dessert",
				'content': dish4,
				"style": "",
				"styleDark": ""
			}
		]

		if (theme1) {
			data.menu[0].style = theme1.replace('DishStyle', '');
		}
		if (theme2) {
			data.menu[1].style = theme2.replace('DishStyle', '');
		}
		if (theme3) {
			data.menu[2].style = theme3.replace('DishStyle', '');
		}
		if (theme4) {
			data.menu[3].style = theme4.replace('DishStyle', '');
		}

		if (theme1Dark) {
			data.menu[0].styleDark = theme1Dark.replace('DishStyle', '');
		}
		if (theme2Dark) {
			data.menu[1].styleDark = theme2Dark.replace('DishStyle', '');
		}
		if (theme3Dark) {
			data.menu[2].styleDark = theme3Dark.replace('DishStyle', '');
		}
		if (theme4Dark) {
			data.menu[3].styleDark = theme4Dark.replace('DishStyle', '');
		}
	} else {
		if (error1) {
			data.errorMessage = error1;
		}
	}

	if (!isErrored2) {
		data.evening = [
			{
				"name": "Entrée",
				'content': dish1e,
				"style": "",
				"styleDark": ""
			},
			{
				"name": "Plat",
				'content': dish2e,
				"style": "",
				"styleDark": ""
			},
			{
				"name": "Légume",
				'content': dish3e,
				"style": "",
				"styleDark": ""
			},
			{
				"name": "Dessert",
				'content': dish4e,
				"style": "",
				"styleDark": ""
			}
		]
		if (theme1e) {
			data.evening[0].style = theme1e.replace('DishStyle', '');
		}
		if (theme2e) {
			data.evening[1].style = theme2e.replace('DishStyle', '');
		}
		if (theme3e) {
			data.evening[2].style = theme3e.replace('DishStyle', '');
		}
		if (theme4e) {
			data.evening[3].style = theme4e.replace('DishStyle', '');
		}

		if (theme1eDark) {
			data.evening[0].styleDark = theme1eDark.replace('DishStyle', '');
		}
		if (theme2eDark) {
			data.evening[1].styleDark = theme2eDark.replace('DishStyle', '');
		}
		if (theme3eDark) {
			data.evening[2].styleDark = theme3eDark.replace('DishStyle', '');
		}
		if (theme4eDark) {
			data.evening[3].styleDark = theme4eDark.replace('DishStyle', '');
		}
	} else {
		if (error1) {
			data.errorEveningMessage = error2;
		}
	}
	return data;
}

function SendNewMenu() {
	const [Content, setContent] = useState(<>Envoi en cours...</>);

	useEffect(() => {
		function SendMenu(data: any) {
			return new Promise(resolve => {
				axios.post(url + `menus/${data.date.split('/')[1]}/${data.date.split('/')[0]}`, { jwt: JSON.parse(window.localStorage.getItem('jwt') as string), menu: data }).catch(err => {
					console.log(err);
					resolve(null);
				}).then(res => {
					resolve(res);
				})
			});
		}
		SendMenu(setDatas()).then(res => {
			window.sessionStorage.clear();
			if (res) {
				setContent(
					<>
						<div>Envoyé !</div>
						<Link to={'/'} className='MenuSentButton'>Retourner au menu</Link>
					</>
				);
			} else {
				setContent(
					<>
						<div>Erreur, le menu n'a pas pu être distribué, consultez la console pour plus d'infos.</div>
						<Link to={'/'} className='MenuSentButton'> Retourner au menu</Link>
					</>);
			}
		})
	}, [setContent]);

	return (
		<div className='SendNewMenu'>
			{Content}
		</div>
	)
}

export default SendNewMenu;