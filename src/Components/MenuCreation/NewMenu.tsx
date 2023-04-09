import { useState } from "react";
import { Link } from 'react-router-dom';

import getThemes from '../../Themes/Selection/index';
import getThemesDark from '../../Themes/SelectionDark/index';
import CustomCheck from './CustomCheck';
import MenuProgressBar from './MenuProgressBar';

import '../../Themes/Light/index.ts';
import '../../Themes/Dark/index.ts';

function NewMenu() {
	function EnterDate() {
		const date = JSON.parse(window.sessionStorage.getItem('date') as string);
		return (
			<input onChange={() => {
				window.sessionStorage.setItem('date', JSON.stringify((document.getElementById("date") as HTMLInputElement).value))
			}} defaultValue={date} className="MenuDateSelection" id="date" type="date" />
		);
	}

	function MenuContent({ evening, error }) {
		function change(event: { target: any }) {
			window.sessionStorage.setItem(event.target.id, JSON.stringify(event.target.value));
		}
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

		if (evening) {
			if (error) {
				return (
					<div className="EnterMenuError">
						Motif:
						<textarea onChange={change} id='error2' defaultValue={error2} spellCheck={true}></textarea>
					</div>
				);
			}
			return (
				<div className="EnterMenuContent">
					<textarea className="EnterMenuContentContent" key={1} onChange={change} id='dish1e' defaultValue={dish1e} spellCheck={true}></textarea>
					<textarea className="EnterMenuContentContent" key={2} onChange={change} id='dish2e' defaultValue={dish2e} spellCheck={true}></textarea>
					<textarea className="EnterMenuContentContent" key={3} onChange={change} id='dish3e' defaultValue={dish3e} spellCheck={true}></textarea>
					<textarea className="EnterMenuContentContent" key={4} onChange={change} id='dish4e' defaultValue={dish4e} spellCheck={true}></textarea>
				</div>
			);
		} else {
			if (error) {
				return (
					<div className="EnterMenuError">
						Motif:
						<textarea onChange={change} id='error1' defaultValue={error1} spellCheck={true}></textarea>
					</div>
				);
			}
			return (
				<div className="EnterMenuContent">
					<textarea className="EnterMenuContentContent" key={1} onChange={change} id='dish1' defaultValue={dish1} spellCheck={true}></textarea>
					<textarea className="EnterMenuContentContent" key={2} onChange={change} id='dish2' defaultValue={dish2} spellCheck={true}></textarea>
					<textarea className="EnterMenuContentContent" key={3} onChange={change} id='dish3' defaultValue={dish3} spellCheck={true}></textarea>
					<textarea className="EnterMenuContentContent" key={4} onChange={change} id='dish4' defaultValue={dish4} spellCheck={true}></textarea>
				</div>
			);
		}
	}

	function EnterMenu() {
		let isErrored1 = JSON.parse(window.sessionStorage.getItem('isErrored1') as string);
		let isErrored2 = JSON.parse(window.sessionStorage.getItem('isErrored2') as string);
		if (isErrored1 == null) {
			isErrored1 = 0;
		}
		if (isErrored2 == null) {
			isErrored2 = 0;
		}
		const [Check1, setCheck1] = useState(isErrored1 ? 0 : 1);
		const [Check2, setCheck2] = useState(isErrored2 ? 0 : 1);
		const [MenuContent1, setMenuContent1] = useState(<MenuContent evening={false} error={isErrored1} />);
		const [MenuContent2, setMenuContent2] = useState(<MenuContent evening={true} error={isErrored2} />);

		function click1() {
			setCheck1(old => {
				if (old) {
					window.sessionStorage.setItem('isErrored1', JSON.stringify(true));
					setMenuContent1(<MenuContent evening={false} error={true} />);
					return 0;
				} else {
					window.sessionStorage.setItem('isErrored1', JSON.stringify(false));
					setMenuContent1(<MenuContent evening={false} error={false} />);
					return 1;
				}
			});
		}

		function click2() {
			setCheck2(old => {
				if (old) {
					window.sessionStorage.setItem('isErrored2', JSON.stringify(true));
					setMenuContent2(<MenuContent evening={true} error={true} />);
					return 0;
				} else {
					window.sessionStorage.setItem('isErrored2', JSON.stringify(false));
					setMenuContent2(<MenuContent evening={true} error={false} />);
					return 1;
				}
			});
		}

		return (
			<div className="EnterMenuDiv">
				<div className="EnterMenu">
					<div className="EnterMenuHeader">
						<div className="EnterMenuDay">Midi</div>
						<div className="EnterMenuCheck" onClick={click1}><CustomCheck type={Check1} /></div>
					</div>
					{MenuContent1}
				</div>
				<div className="EnterMenu">
					<div className="EnterMenuHeader">
						<div className="EnterMenuDay">Soir</div>
						<div className="EnterMenuCheck" onClick={click2}><CustomCheck type={Check2} /></div>
					</div>
					{MenuContent2}
				</div>
			</div>
		);
	}

	function SelectThemes() {
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

		const themes = getThemes();

		const theme1Default = JSON.parse(window.sessionStorage.getItem('dish1Style') as string) ? JSON.parse(window.sessionStorage.getItem('dish1Style') as string) : 'DishStyleblue';
		window.sessionStorage.setItem('dish1Style', JSON.stringify(theme1Default));
		const theme2Default = JSON.parse(window.sessionStorage.getItem('dish2Style') as string) ? JSON.parse(window.sessionStorage.getItem('dish2Style') as string) : 'DishStylered';
		window.sessionStorage.setItem('dish2Style', JSON.stringify(theme2Default));
		const theme3Default = JSON.parse(window.sessionStorage.getItem('dish3Style') as string) ? JSON.parse(window.sessionStorage.getItem('dish3Style') as string) : 'DishStylegreen';
		window.sessionStorage.setItem('dish3Style', JSON.stringify(theme3Default));
		const theme4Default = JSON.parse(window.sessionStorage.getItem('dish4Style') as string) ? JSON.parse(window.sessionStorage.getItem('dish4Style') as string) : 'DishStyleyellow';
		window.sessionStorage.setItem('dish4Style', JSON.stringify(theme4Default));

		const theme1eDefault = JSON.parse(window.sessionStorage.getItem('dish1eStyle') as string) ? JSON.parse(window.sessionStorage.getItem('dish1eStyle') as string) : 'DishStyleblue';
		window.sessionStorage.setItem('dish1eStyle', JSON.stringify(theme1eDefault));
		const theme2eDefault = JSON.parse(window.sessionStorage.getItem('dish2eStyle') as string) ? JSON.parse(window.sessionStorage.getItem('dish2eStyle') as string) : 'DishStylered';
		window.sessionStorage.setItem('dish2eStyle', JSON.stringify(theme2eDefault));
		const theme3eDefault = JSON.parse(window.sessionStorage.getItem('dish3eStyle') as string) ? JSON.parse(window.sessionStorage.getItem('dish3eStyle') as string) : 'DishStylegreen';
		window.sessionStorage.setItem('dish3eStyle', JSON.stringify(theme3eDefault));
		const theme4eDefault = JSON.parse(window.sessionStorage.getItem('dish4eStyle') as string) ? JSON.parse(window.sessionStorage.getItem('dish4eStyle') as string) : 'DishStyleyellow';
		window.sessionStorage.setItem('dish4eStyle', JSON.stringify(theme4eDefault));
		const [theme1, setTheme1] = useState(theme1Default);
		const [theme2, setTheme2] = useState(theme2Default);
		const [theme3, setTheme3] = useState(theme3Default);
		const [theme4, setTheme4] = useState(theme4Default);
		const [theme1e, setTheme1e] = useState(theme1eDefault);
		const [theme2e, setTheme2e] = useState(theme2eDefault);
		const [theme3e, setTheme3e] = useState(theme3eDefault);
		const [theme4e, setTheme4e] = useState(theme4eDefault);


		function changeTheme(id: string, callback: Function) {
			const theme = (document.getElementById(id) as any).firstChild.value;
			const classes = (document.getElementById(id) as any).className.split(' ');
			classes[classes.length - 1] = 'DishStyle' + theme;
			window.sessionStorage.setItem(id + 'Style', JSON.stringify(classes[classes.length - 1]));
			callback(classes.join(' '));
		}

		function Select({ id, callback }) {
			return (
				<select onChange={() => changeTheme(id, callback)} className="SelectTheme">
					{themes.map((theme, i) => {
						return <option key={i} value={theme.name}>{theme.title}</option>
					})}
				</select>
			);
		}

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
							<Select callback={setTheme1} id='dish1' />
							<div className="MenuContentText">{dish1}</div>
						</div>
						<div id='dish2' className={"EnterMenuContentContent " + theme2} key={2}>
							<Select callback={setTheme2} id='dish2' />
							<div className="MenuContentText">{dish2}</div>
						</div>
						<div id='dish3' className={"EnterMenuContentContent " + theme3} key={3}>
							<Select callback={setTheme3} id='dish3' />
							<div className="MenuContentText">{dish3}</div>
						</div>
						<div id='dish4' className={"EnterMenuContentContent " + theme4} key={4}>
							<Select callback={setTheme4} id='dish4' />
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
							<Select callback={setTheme1e} id='dish1e' />
							<div className="MenuContentText">{dish1e}</div>
						</div>
						<div id='dish2e' className={"EnterMenuContentContent " + theme2e} key={2}>
							<Select callback={setTheme2e} id='dish2e' />
							<div className="MenuContentText">{dish2e}</div>
						</div>
						<div id='dish3e' className={"EnterMenuContentContent " + theme3e} key={3}>
							<Select callback={setTheme3e} id='dish3e' />
							<div className="MenuContentText">{dish3e}</div>
						</div>
						<div id='dish4e' className={"EnterMenuContentContent " + theme4e} key={4}>
							<Select callback={setTheme4e} id='dish4e' />
							<div className="MenuContentText">{dish4e}</div>
						</div>
					</div>
				</div>

			);
		}
		return (
			<div className="EnterMenuDiv">
				{content}
			</div>
		);
	}

	function SelectThemesDark() {
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

		const themes = getThemesDark();

		const theme1Default = JSON.parse(window.sessionStorage.getItem('dish1Styledark') as string) ? JSON.parse(window.sessionStorage.getItem('dish1Styledark') as string) : 'DishStyleblueDark';
		window.sessionStorage.setItem('dish1Styledark', JSON.stringify(theme1Default));
		const theme2Default = JSON.parse(window.sessionStorage.getItem('dish2Styledark') as string) ? JSON.parse(window.sessionStorage.getItem('dish2Styledark') as string) : 'DishStyleredDark';
		window.sessionStorage.setItem('dish2Styledark', JSON.stringify(theme2Default));
		const theme3Default = JSON.parse(window.sessionStorage.getItem('dish3Styledark') as string) ? JSON.parse(window.sessionStorage.getItem('dish3Styledark') as string) : 'DishStylegreenDark';
		window.sessionStorage.setItem('dish3Styledark', JSON.stringify(theme3Default));
		const theme4Default = JSON.parse(window.sessionStorage.getItem('dish4Styledark') as string) ? JSON.parse(window.sessionStorage.getItem('dish4Styledark') as string) : 'DishStyleyellowDark';
		window.sessionStorage.setItem('dish4Styledark', JSON.stringify(theme4Default));

		const theme1eDefault = JSON.parse(window.sessionStorage.getItem('dish1eStyledark') as string) ? JSON.parse(window.sessionStorage.getItem('dish1eStyledark') as string) : 'DishStyleblueDark';
		window.sessionStorage.setItem('dish1eStyledark', JSON.stringify(theme1eDefault));
		const theme2eDefault = JSON.parse(window.sessionStorage.getItem('dish2eStyledark') as string) ? JSON.parse(window.sessionStorage.getItem('dish2eStyledark') as string) : 'DishStyleredDark';
		window.sessionStorage.setItem('dish2eStyledark', JSON.stringify(theme2eDefault));
		const theme3eDefault = JSON.parse(window.sessionStorage.getItem('dish3eStyledark') as string) ? JSON.parse(window.sessionStorage.getItem('dish3eStyledark') as string) : 'DishStylegreenDark';
		window.sessionStorage.setItem('dish3eStyledark', JSON.stringify(theme3eDefault));
		const theme4eDefault = JSON.parse(window.sessionStorage.getItem('dish4eStyledark') as string) ? JSON.parse(window.sessionStorage.getItem('dish4eStyledark') as string) : 'DishStyleyellowDark';
		window.sessionStorage.setItem('dish4eStyledark', JSON.stringify(theme4eDefault));
		const [theme1, setTheme1] = useState(theme1Default);
		const [theme2, setTheme2] = useState(theme2Default);
		const [theme3, setTheme3] = useState(theme3Default);
		const [theme4, setTheme4] = useState(theme4Default);
		const [theme1e, setTheme1e] = useState(theme1eDefault);
		const [theme2e, setTheme2e] = useState(theme2eDefault);
		const [theme3e, setTheme3e] = useState(theme3eDefault);
		const [theme4e, setTheme4e] = useState(theme4eDefault);


		function changeTheme(id: string, callback: Function) {
			const theme = (document.getElementById(id) as any).firstChild.value;
			const classes = (document.getElementById(id) as any).className.split(' ');
			classes[classes.length - 1] = 'DishStyle' + theme;
			window.sessionStorage.setItem(id + 'Styledark', JSON.stringify(classes[classes.length - 1]));
			callback(classes.join(' '));
		}

		function Select({ id, callback }) {
			return (
				<select onChange={() => changeTheme(id, callback)} className="SelectTheme">
					{themes.map((theme, i) => {
						return <option key={i} value={theme.name}>{theme.title}</option>
					})}
				</select>
			);
		}

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
							<Select callback={setTheme1} id='dish1' />
							<div className="MenuContentText">{dish1}</div>
						</div>
						<div id='dish2' className={"EnterMenuContentContent " + theme2} key={2}>
							<Select callback={setTheme2} id='dish2' />
							<div className="MenuContentText">{dish2}</div>
						</div>
						<div id='dish3' className={"EnterMenuContentContent " + theme3} key={3}>
							<Select callback={setTheme3} id='dish3' />
							<div className="MenuContentText">{dish3}</div>
						</div>
						<div id='dish4' className={"EnterMenuContentContent " + theme4} key={4}>
							<Select callback={setTheme4} id='dish4' />
							<div className="MenuContentText">{dish4}</div>
						</div>
					</div>
				</div >
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
							<Select callback={setTheme1e} id='dish1e' />
							<div className="MenuContentText">{dish1e}</div>
						</div>
						<div id='dish2e' className={"EnterMenuContentContent " + theme2e} key={2}>
							<Select callback={setTheme2e} id='dish2e' />
							<div className="MenuContentText">{dish2e}</div>
						</div>
						<div id='dish3e' className={"EnterMenuContentContent " + theme3e} key={3}>
							<Select callback={setTheme3e} id='dish3e' />
							<div className="MenuContentText">{dish3e}</div>
						</div>
						<div id='dish4e' className={"EnterMenuContentContent " + theme4e} key={4}>
							<Select callback={setTheme4e} id='dish4e' />
							<div className="MenuContentText">{dish4e}</div>
						</div>
					</div>
				</div>

			);
		}
		return (
			<div className="EnterMenuDiv">
				{content}
			</div>
		);
	}

	function ValidButton() {
		return (
			<Link to={'/NewMenuValid'} className="ValidButtonNav">
				<svg xmlns="http://www.w3.org/2000/svg" width="4vmax" height="4vmax" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<polyline points="20 6 9 17 4 12"></polyline>
				</svg>
			</Link>
		)
	}

	function NavButton({ Next }) {
		if (Next) {
			return (
				<div className="NavButtonNext" onClick={next}>
					<div className="NextButton">
						<div>
						</div>
					</div>
				</div>
			);
		}

		return (
			<div className="NavButtonPrev" onClick={prev}>
				<div className="PrevButton">
					<div>
					</div>
				</div>
			</div>
		);
	}

	const [Title, setTitle] = useState('Choix de la date');
	const [BarState, setBarState] = useState(1);
	const [Content, setContent] = useState(<EnterDate />);
	const [PrevButton, setPrevButton] = useState(<></>);
	const [NextButton, setNextButton] = useState(<NavButton Next={true} />);


	function next() {
		setBarState(old => {
			if (old === 1) {
				setPrevButton(<NavButton Next={false} />);
				setTitle('Saisie du menu');
				setContent(<EnterMenu />);
				return 2;
			} else if (old === 2) {
				setTitle('Choix des thèmes');
				setContent(<SelectThemes />);
				return 3;
			} else if (old === 3) {
				setNextButton(<ValidButton />);
				setTitle('Choix des thèmes sombres');
				setContent(<SelectThemesDark />);
				return 4;
			}
			return 1;
		});
	}

	function prev() {
		setBarState(old => {
			if (old === 2) {
				setPrevButton(<></>);
				setTitle('Choix de la date');
				setContent(<EnterDate />);
				return 1;
			} else if (old === 3) {
				setTitle('Saisie du menu');
				setContent(<EnterMenu />);
				return 2;
			} else if (old === 4) {
				setNextButton(<NavButton Next={true} />);
				setTitle('Choix des thèmes');
				setContent(<SelectThemes />);
				return 3;
			}
			return 1;
		});
	}


	return (
		<>
			<div className='NewMenuRotateError'> cette pages n'est pas disponible sur mobile</div>
			<div className="NewMenu">
				<MenuProgressBar state={BarState} />
				<div className="NewMenuTitle">{Title}</div>
				<div className="NewMenuContent">{Content}</div>
				{PrevButton}
				{NextButton}
			</div>
		</>
	);
}

export default NewMenu;