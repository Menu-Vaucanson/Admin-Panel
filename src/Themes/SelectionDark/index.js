import blueDark from './blueDark';
import redDark from './redDark';
import greenDark from './greenDark';
import yellowDark from './yellowDark';

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