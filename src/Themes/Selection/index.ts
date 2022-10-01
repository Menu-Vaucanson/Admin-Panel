// @ts-ignore
import blue from './blue.ts';
// @ts-ignore
import red from './red.ts';
// @ts-ignore
import green from './green.ts';
// @ts-ignore
import yellow from './yellow.ts';

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