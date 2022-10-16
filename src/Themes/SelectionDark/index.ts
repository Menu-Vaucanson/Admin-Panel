import blueDark from './blueDark';
import redDark from './redDark';
import greenDark from './greenDark';
import yellowDark from './yellowDark';
import halloweenDark from './halloweenDark';

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