// @ts-ignore
import blueDark from './blueDark.ts';
// @ts-ignore
import redDark from './redDark.ts';
// @ts-ignore
import greenDark from './greenDark.ts';
// @ts-ignore
import yellowDark from './yellowDark.ts';

function getThemesDark() {
	const themes = [
		{
			title: 'Aucun',
			name: 'None'
		},
		blueDark,
		redDark,
		greenDark,
		yellowDark
	];

	return themes;
}

export default getThemesDark;