import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const url = 'https://menuvox.fr:8081/';


function DeleteMenuValid() {
	const [Content, setContent] = useState(<>Suppression en cours...</>);

	useEffect(() => {
		const date = JSON.parse(window.sessionStorage.getItem('date') as string);
		function DeleteMenu() {
			return new Promise(resolve => {
				axios.post(url + `deleteMenus/${date.split('/')[1]}/${date.split('/')[0]}`, { jwt: JSON.parse(window.localStorage.getItem('jwt') as string) }).catch(err => {
					console.error(err);
					resolve(null);
				}).then(res => {
					resolve(res);
				})
			});
		}
		DeleteMenu().then(res => {
			window.sessionStorage.clear();
			if (res) {
				setContent(
					<>
						<div>Supprimé !</div>
						<Link to={'/'} className='MenuSentButton'>Retourner au menu</Link>
					</>
				);
			} else {
				setContent(
					<>
						<div>Erreur, le menu n'a pas pu être supprimé, vos permissions sont insuffisantes.</div>
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

export default DeleteMenuValid;