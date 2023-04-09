import blue from './blue';
import green from './green';
import halloween from './halloween';
import red from './red';
import yellow from './yellow';

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