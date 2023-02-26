import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Menu, { Dish } from './MenuClass';

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
	const data = new Menu(d, isErrored1, isErrored2);

	if (!isErrored1) {
		data.setMenu([
			new Dish("Entrée", dish1),
			new Dish("Plat", dish2),
			new Dish("Légume", dish3),
			new Dish("Dessert", dish4),
		]);

		if (theme1) {
			data.setMenuStyle(0, theme1.replace('DishStyle', ''));
		}
		if (theme2) {
			data.setMenuStyle(1, theme2.replace('DishStyle', ''));
		}
		if (theme3) {
			data.setMenuStyle(2, theme3.replace('DishStyle', ''));
		}
		if (theme4) {
			data.setMenuStyle(3, theme4.replace('DishStyle', ''));
		}

		if (theme1Dark) {
			data.setMenuStyleDark(0, theme1Dark.replace('DishStyle', ''));
		}
		if (theme2Dark) {
			data.setMenuStyleDark(1, theme2Dark.replace('DishStyle', ''));
		}
		if (theme3Dark) {
			data.setMenuStyleDark(2, theme3Dark.replace('DishStyle', ''));
		}
		if (theme4Dark) {
			data.setMenuStyleDark(3, theme4Dark.replace('DishStyle', ''));
		}
	} else {
		if (error1) {
			data.setErrorMessage(error1);
		}
	}

	if (!isErrored2) {
		data.setEvening([
			new Dish("Entrée", dish1e),
			new Dish("Plat", dish2e),
			new Dish("Légume", dish3e),
			new Dish("Dessert", dish4e),
		]);
		if (theme1e) {
			data.setEveningStyle(0, theme1e.replace('DishStyle', ''));
		}
		if (theme2e) {
			data.setEveningStyle(1, theme2e.replace('DishStyle', ''));
		}
		if (theme3e) {
			data.setEveningStyle(2, theme3e.replace('DishStyle', ''));
		}
		if (theme4e) {
			data.setEveningStyle(3, theme4e.replace('DishStyle', ''));
		}

		if (theme1eDark) {
			data.setEveningStyleDark(0, theme1eDark.replace('DishStyle', ''));
		}
		if (theme2eDark) {
			data.setEveningStyleDark(1, theme2eDark.replace('DishStyle', ''));
		}
		if (theme3eDark) {
			data.setEveningStyleDark(2, theme3eDark.replace('DishStyle', ''));
		}
		if (theme4eDark) {
			data.setEveningStyleDark(3, theme4eDark.replace('DishStyle', ''));
		}
	} else {
		if (error1) {
			data.setErrorEveningMessage(error2);
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
					console.error(err);
					resolve(null);
				}).then(res => {
					resolve(res);
				});
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
						<div>Erreur, le menu n'a pas pu être distribué, vos permissions sont insuffisantes.</div>
						<Link to={'/'} className='MenuSentButton'>Retourner au menu</Link>
					</>);
			}
		});
	}, [setContent]);

	return (
		<div className='SendNewMenu'>
			{Content}
		</div>
	);
}

export default SendNewMenu;