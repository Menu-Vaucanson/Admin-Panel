import { Link } from 'react-router-dom';

import CustomCheck from './CustomCheck';


function RenderMenu() {
	const initial = 'DishStyleNone';
	const dish1 = JSON.parse(window.sessionStorage.getItem('dish1') as string);
	const dish2 = JSON.parse(window.sessionStorage.getItem('dish2') as string);
	const dish3 = JSON.parse(window.sessionStorage.getItem('dish3') as string);
	const dish4 = JSON.parse(window.sessionStorage.getItem('dish4') as string);
	const dish1e = JSON.parse(window.sessionStorage.getItem('dish1e') as string);
	const dish2e = JSON.parse(window.sessionStorage.getItem('dish2e') as string);
	const dish3e = JSON.parse(window.sessionStorage.getItem('dish3e') as string);
	const dish4e = JSON.parse(window.sessionStorage.getItem('dish4e') as string);

	const error1 = JSON.parse(window.sessionStorage.getItem('error1') as string);
	const error2 = JSON.parse(window.sessionStorage.getItem('error2') as string);

	let isErrored1 = JSON.parse(window.sessionStorage.getItem('isErrored1') as string);
	let isErrored2 = JSON.parse(window.sessionStorage.getItem('isErrored2') as string);
	if (isErrored1 == null) {
		isErrored1 = false;
	}
	if (isErrored2 == null) {
		isErrored2 = false;
	}

	const theme1 = JSON.parse(window.sessionStorage.getItem('dish1Style') as string) ? JSON.parse(window.sessionStorage.getItem('dish1Style') as string) : initial;
	const theme2 = JSON.parse(window.sessionStorage.getItem('dish2Style') as string) ? JSON.parse(window.sessionStorage.getItem('dish2Style') as string) : initial;
	const theme3 = JSON.parse(window.sessionStorage.getItem('dish3Style') as string) ? JSON.parse(window.sessionStorage.getItem('dish3Style') as string) : initial;
	const theme4 = JSON.parse(window.sessionStorage.getItem('dish4Style') as string) ? JSON.parse(window.sessionStorage.getItem('dish4Style') as string) : initial;

	const theme1e = JSON.parse(window.sessionStorage.getItem('dish1eStyle') as string) ? JSON.parse(window.sessionStorage.getItem('dish1eStyle') as string) : initial;
	const theme2e = JSON.parse(window.sessionStorage.getItem('dish2eStyle') as string) ? JSON.parse(window.sessionStorage.getItem('dish2eStyle') as string) : initial;
	const theme3e = JSON.parse(window.sessionStorage.getItem('dish3eStyle') as string) ? JSON.parse(window.sessionStorage.getItem('dish3eStyle') as string) : initial;
	const theme4e = JSON.parse(window.sessionStorage.getItem('dish4eStyle') as string) ? JSON.parse(window.sessionStorage.getItem('dish4eStyle') as string) : initial;

	const content: Array<any> = [];

	if (isErrored1) {
		if (error1) {
			content.push(
				<div className="EnterMenu" key={1}>
					<div className="EnterMenuHeader">
						<div className="EnterMenuDayTheme">Midi</div>
					</div>
					<div className="EnterMenuError">
						<div>{error1}</div>
					</div>
				</div>
			);
		}
	} else {
		content.push(
			<div className="EnterMenu" key={1}>
				<div className="EnterMenuHeader">
					<div className="EnterMenuDayTheme">Midi</div>
				</div>
				<div className="EnterMenuContent">
					<div id='dish1' className={"EnterMenuContentContent " + theme1} key={1}>
						<div className="MenuContentText">{dish1}</div>
					</div>
					<div id='dish2' className={"EnterMenuContentContent " + theme2} key={2}>
						<div className="MenuContentText">{dish2}</div>
					</div>
					<div id='dish3' className={"EnterMenuContentContent " + theme3} key={3}>
						<div className="MenuContentText">{dish3}</div>
					</div>
					<div id='dish4' className={"EnterMenuContentContent " + theme4} key={4}>
						<div className="MenuContentText">{dish4}</div>
					</div>
				</div>
			</div>
		);
	}

	if (isErrored2) {
		if (error2) {
			content.push(
				<div className="EnterMenu" key={2}>
					<div className="EnterMenuHeader">
						<div className="EnterMenuDayTheme">Soir</div>
					</div>
					<div className="EnterMenuError">
						<div>{error2}</div>
					</div>
				</div>
			);
		}
	} else {
		content.push(
			<div className="EnterMenu" key={2}>
				<div className="EnterMenuHeader">
					<div className="EnterMenuDayTheme">Soir</div>
				</div>
				<div className="EnterMenuContent">
					<div id='dish1e' className={"EnterMenuContentContent " + theme1e} key={1}>
						<div className="MenuContentText">{dish1e}</div>
					</div>
					<div id='dish2e' className={"EnterMenuContentContent " + theme2e} key={2}>
						<div className="MenuContentText">{dish2e}</div>
					</div>
					<div id='dish3e' className={"EnterMenuContentContent " + theme3e} key={3}>
						<div className="MenuContentText">{dish3e}</div>
					</div>
					<div id='dish4e' className={"EnterMenuContentContent " + theme4e} key={4}>
						<div className="MenuContentText">{dish4e}</div>
					</div>
				</div>
			</div>

		);
	}
	return content;
}

function NewMenuValid() {
	const content = RenderMenu();
	let valid = 1;
	let error = '';
	let warn = '';

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

	if (!date || date === '') {
		valid = 0;
		error = 'La date n\'a pas été sasie';
	}

	if (!isErrored1) {
		if (!dish1 || dish1 === '') {
			valid = 0;
			error = 'L\'entrée du midi n\'a pas été saisie';
		} else if (!dish2 || dish2 === '') {
			valid = 0;
			error = 'Le plat du midi n\'a pas été saisie';
		} else if (!dish3 || dish3 === '') {
			valid = 0;
			error = 'Le légume du midi n\'a pas été saisie';
		} else if (!dish4 || dish4 === '') {
			valid = 0;
			error = 'Le dessert du midi n\'a pas été saisie';
		}

		if (!theme1 || theme1 === '') {
			warn = 'Le thème de l\'entrée du midi n\'a pas été saisie';
		} else if (!theme2 || theme2 === '') {
			warn = 'Le thème du plat du midi n\'a pas été saisie';
		} else if (!theme3 || theme3 === '') {
			warn = 'Le thème du légume du midi n\'a pas été saisie';
		} else if (!theme4 || theme4 === '') {
			warn = 'Le thème du dessert du midi n\'a pas été saisie';
		}

		if (!theme1Dark || theme1Dark === '') {
			warn = 'Le thème sombre de l\'entrée du midi n\'a pas été saisie';
		} else if (!theme2Dark || theme2Dark === '') {
			warn = 'Le thème sombre du plat du midi n\'a pas été saisie';
		} else if (!theme3Dark || theme3Dark === '') {
			warn = 'Le thème sombre du légume du midi n\'a pas été saisie';
		} else if (!theme4Dark || theme4Dark === '') {
			warn = 'Le thème sombre du dessert du midi n\'a pas été saisie';
		}
	}

	if (!isErrored2) {
		if (!dish1e || dish1e === '') {
			valid = 0;
			error = 'L\'entrée du soir n\'a pas été saisie';
		} else if (!dish2e || dish2e === '') {
			valid = 0;
			error = 'Le plat du soir n\'a pas été saisie';
		} else if (!dish3e || dish3e === '') {
			valid = 0;
			error = 'Le légume du soir n\'a pas été saisie';
		} else if (!dish4e || dish4e === '') {
			valid = 0;
			error = 'Le dessert du soir n\'a pas été saisie';
		}

		if (!theme1e || theme1e === '') {
			warn = 'Le thème de l\'entrée du soir n\'a pas été saisie';
		} else if (!theme2e || theme2e === '') {
			warn = 'Le thème du plat du soir n\'a pas été saisie';
		} else if (!theme3e || theme3e === '') {
			warn = 'Le thème du légume du soir n\'a pas été saisie';
		} else if (!theme4e || theme4e === '') {
			warn = 'Le thème du dessert du soir n\'a pas été saisie';
		}

		if (!theme1eDark || theme1eDark === '') {
			warn = 'Le thème sombre de l\'entrée du soir n\'a pas été saisie';
		} else if (!theme2eDark || theme2eDark === '') {
			warn = 'Le thème sombre du plat du soir n\'a pas été saisie';
		} else if (!theme3eDark || theme3eDark === '') {
			warn = 'Le thème sombre du légume du soir n\'a pas été saisie';
		} else if (!theme4eDark || theme4eDark === '') {
			warn = 'Le thème sombre du dessert du soir n\'a pas été saisie';
		}
	}


	const data = valid ? (warn ? (
		<div className='NewMenuValidHeader'>
			<CustomCheck type={3} /> Menu valide, attention: {warn}
		</div>
	) : (
		<div className='NewMenuValidHeader'>
			<CustomCheck type={1} /> Menu valide !
		</div>
	)
	) : (
		<div className='NewMenuValidHeader'>
			<CustomCheck type={2} /> Menu Invalide: {error}
		</div>
	)

	let button = <></>;
	if (valid) {
		button = (
			<Link to={'/SendNewMenu'} className="ValidButtonNav">
				<svg xmlns="http://www.w3.org/2000/svg" width="4vmax" height="4vmax" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<polyline points="20 6 9 17 4 12"></polyline>
				</svg>
			</Link>
		)
	}

	return (
		<div className="NewMenuValid">
			{data}
			<div className='NewMenuValidBody'>
				{content}
			</div>
			{button}
		</div>
	);
}

export default NewMenuValid;