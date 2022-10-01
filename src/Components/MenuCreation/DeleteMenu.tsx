import { useState } from 'react';
import { Link } from 'react-router-dom';

let date: any;
function DeleteMenu() {
	const [Next, setNext] = useState(<></>);
	const [Content, setContent] = useState(<EnterDate />);

	function EnterDate() {
		return (
			<input onChange={() => {
				date = (document.getElementById("date") as HTMLInputElement).value;
				setNext(
					<div onClick={click} className="NavButtonNext">
						<div className="NextButton">
							<div>
							</div>
						</div>
					</div>
				);
			}} defaultValue={date} className="MenuDateSelectionDelete" id="date" type="date" />
		);
	}

	function ValidButton() {
		return (
			<Link to={'/DeleteMenuValid'} className="ValidButtonNav">
				<svg xmlns="http://www.w3.org/2000/svg" width="4vmax" height="4vmax" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<polyline points="20 6 9 17 4 12"></polyline>
				</svg>
			</Link>
		)
	}

	function click() {
		date = date.split('-');
		window.sessionStorage.setItem('date', JSON.stringify(date[2] + '/' + date[1] + '/' + date[0]));
		setContent(
			<div className='DeleteMenuMessage'>
				Êtes-vous sûr de vouloir supprimer le menu du {date[2]}/{date[1]}/{date[0]} ?
			</div>
		);
		setNext(<ValidButton />)
	}

	return (
		<div className="DeleteMenu">
			{Content}
			{Next}
		</div>
	)
}

export default DeleteMenu;