import blue from './blue';
import red from './red';
import green from './green';
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
		yellow
	];

	return themes;
}

export default getThemes;