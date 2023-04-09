import blueDark from './blueDark';
import greenDark from './greenDark';
import halloweenDark from './halloweenDark';
import redDark from './redDark';
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
		yellowDark,
		halloweenDark
	];

	return themes;
}

export default getThemesDark;