import blue from './blue';
import red from './red';
import green from './green';
import yellow from './yellow';
import halloween from './halloween';

function getThemes() {
	const themes = [
		{
			title: 'Aucun',
			name: 'None'
		},
		blue,
		red,
		green,
		yellow,
		halloween
	];

	return themes;
}

export default getThemes;