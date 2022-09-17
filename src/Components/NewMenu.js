import { useState } from "react";

import CustomCheck from './CustomCheck';
import MenuProgressBar from "./MenuProgressBar";

function NewMenu() {
	function EnterDate() {
		const date = JSON.parse(window.sessionStorage.getItem('date'));
		return (
			<input onChange={() => {
				window.sessionStorage.setItem('date', JSON.stringify(document.getElementById("date").value))
			}} defaultValue={date} className="MenuDateSelection" id="date" type="date" />
		)
	}

	function MenuContent({ evening, error }) {
		const change = (event) => {
			window.sessionStorage.setItem(event.target.id, JSON.stringify(event.target.value));
		}
		const dish1 = JSON.parse(window.sessionStorage.getItem('dish1'));
		const dish2 = JSON.parse(window.sessionStorage.getItem('dish2'));
		const dish3 = JSON.parse(window.sessionStorage.getItem('dish3'));
		const dish4 = JSON.parse(window.sessionStorage.getItem('dish4'));
		const dish1e = JSON.parse(window.sessionStorage.getItem('dish1e'));
		const dish2e = JSON.parse(window.sessionStorage.getItem('dish2e'));
		const dish3e = JSON.parse(window.sessionStorage.getItem('dish3e'));
		const dish4e = JSON.parse(window.sessionStorage.getItem('dish4e'));

		const error1 = JSON.parse(window.sessionStorage.getItem('error1'));
		const error2 = JSON.parse(window.sessionStorage.getItem('error2'));

		if (evening) {
			if (error) {
				return (
					<div className="EnterMenuError">
						Motif:
						<textarea onChange={change} id='error2' defaultValue={error2} spellCheck={true}></textarea>
					</div>
				)
			}
			return (
				<div className="EnterMenuContent">
					<textarea key={1} onChange={change} id='dish1e' defaultValue={dish1e} spellCheck={true}></textarea>
					<textarea key={2} onChange={change} id='dish2e' defaultValue={dish2e} spellCheck={true}></textarea>
					<textarea key={3} onChange={change} id='dish3e' defaultValue={dish3e} spellCheck={true}></textarea>
					<textarea key={4} onChange={change} id='dish4e' defaultValue={dish4e} spellCheck={true}></textarea>
				</div>
			)
		} else {
			if (error) {
				return (
					<div className="EnterMenuError">
						Motif:
						<textarea onChange={change} id='error1' defaultValue={error1} spellCheck={true}></textarea>
					</div>
				)
			}
			return (
				<div className="EnterMenuContent">
					<textarea key={1} onChange={change} id='dish1' defaultValue={dish1} spellCheck={true}></textarea>
					<textarea key={2} onChange={change} id='dish2' defaultValue={dish2} spellCheck={true}></textarea>
					<textarea key={3} onChange={change} id='dish3' defaultValue={dish3} spellCheck={true}></textarea>
					<textarea key={4} onChange={change} id='dish4' defaultValue={dish4} spellCheck={true}></textarea>
				</div>
			)
		}
	}

	function EnterMenu() {
		let isErrored1 = JSON.parse(window.sessionStorage.getItem('isErrored1'));
		let isErrored2 = JSON.parse(window.sessionStorage.getItem('isErrored2'));
		if (isErrored1 == null) {
			isErrored1 = false;
		}
		if (isErrored2 == null) {
			isErrored2 = false;
		}
		const [Check1, setCheck1] = useState(!isErrored1);
		const [Check2, setCheck2] = useState(!isErrored2);
		const [MenuContent1, setMenuContent1] = useState(<MenuContent evening={false} error={isErrored1} />);
		const [MenuContent2, setMenuContent2] = useState(<MenuContent evening={true} error={isErrored2} />);

		function click1() {
			setCheck1(old => {
				if (old) {
					window.sessionStorage.setItem('isErrored1', JSON.stringify(true));
					setMenuContent1(<MenuContent evening={false} error={true} />);
					return !old;
				} else {
					window.sessionStorage.setItem('isErrored1', JSON.stringify(false));
					setMenuContent1(<MenuContent evening={false} error={false} />);
					return !old;
				}
			});
		}

		function click2() {
			setCheck2(old => {
				if (old) {
					window.sessionStorage.setItem('isErrored2', JSON.stringify(true));
					setMenuContent2(<MenuContent evening={true} error={true} />);
					return !old;
				} else {
					window.sessionStorage.setItem('isErrored2', JSON.stringify(false));
					setMenuContent2(<MenuContent evening={true} error={false} />);
					return !old;
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
		)
	}

	function SelectThemes() {
		const dish1 = JSON.parse(window.sessionStorage.getItem('dish1'));
		const dish2 = JSON.parse(window.sessionStorage.getItem('dish2'));
		const dish3 = JSON.parse(window.sessionStorage.getItem('dish3'));
		const dish4 = JSON.parse(window.sessionStorage.getItem('dish4'));
		const dish1e = JSON.parse(window.sessionStorage.getItem('dish1e'));
		const dish2e = JSON.parse(window.sessionStorage.getItem('dish2e'));
		const dish3e = JSON.parse(window.sessionStorage.getItem('dish3e'));
		const dish4e = JSON.parse(window.sessionStorage.getItem('dish4e'));

		const error1 = JSON.parse(window.sessionStorage.getItem('error1'));
		const error2 = JSON.parse(window.sessionStorage.getItem('error2'));

		let isErrored1 = JSON.parse(window.sessionStorage.getItem('isErrored1'));
		let isErrored2 = JSON.parse(window.sessionStorage.getItem('isErrored2'));
		if (isErrored1 == null) {
			isErrored1 = false;
		}
		if (isErrored2 == null) {
			isErrored2 = false;
		}
		const content = [];

		if (isErrored1) {
			if (error1) {
				content.push(
					<div className="EnterMenu">
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
				<div className="EnterMenu">
					<div className="EnterMenuHeader">
						<div className="EnterMenuDayTheme">Midi</div>
					</div>
					<div className="EnterMenuContent">
						<div key={1}>{dish1}</div>
						<div key={2}>{dish2}</div>
						<div key={3}>{dish3}</div>
						<div key={4}>{dish4}</div>
					</div>
				</div >
			);
		}

		if (isErrored2) {
			if (error2) {
				content.push(
					<div className="EnterMenu">
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
				<div className="EnterMenu">
					<div className="EnterMenuHeader">
						<div className="EnterMenuDayTheme">Soir</div>
					</div>
					<div className="EnterMenuContent">
						<div key={1}>{dish1e}</div>
						<div key={2}>{dish2e}</div>
						<div key={3}>{dish3e}</div>
						<div key={4}>{dish4e}</div>
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


	function NavButton({ Next }) {
		if (Next) {
			return (
				<div className="NavButtonNext" onClick={next}>
					<div className="NextButton">
						<div>
						</div>
					</div>
				</div>
			)
		}

		return (
			<div className="NavButtonPrev" onClick={prev}>
				<div className="PrevButton">
					<div>
					</div>
				</div>
			</div>
		)
	}

	const [Title, setTitle] = useState('Choix de la date');
	const [BarState, setBarState] = useState(1);
	const [Content, setContent] = useState(<EnterDate date={JSON.parse(window.sessionStorage.getItem('date'))} />);
	const [PrevButton, setPrevButton] = useState();
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
				setNextButton();
				setTitle('Validation');
				setContent();
				return 4;
			}
		});
	}

	function prev() {
		setBarState(old => {
			if (old === 2) {
				setPrevButton();
				setTitle('Choix de la date');
				setContent(<EnterDate date={JSON.parse(window.sessionStorage.getItem('date'))} />);
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
		});
	}


	return (
		<div className="NewMenu">
			<MenuProgressBar state={BarState} />
			<div className="NewMenuTitle">{Title}</div>
			<div className="NewMenuContent">{Content}</div>
			{PrevButton}
			{NextButton}
		</div>
	);
}

export default NewMenu;