import { useEffect, useState } from "react";

function MenuProgressBar({ state }) {
	const [P1, setP1] = useState("noneBar");
	const [P2, setP2] = useState("noneBar");
	const [P3, setP3] = useState("noneBar");
	const [P4, setP4] = useState("noneBar");

	useEffect(() => {
		if (state > 0) {
			setP1("blueBar");
		} else {
			setP1("noneBar");
		}
		if (state > 1) {
			setP2("blueBar");
		} else {
			setP2("noneBar");
		}
		if (state > 2) {
			setP3("blueBar");
		} else {
			setP3("noneBar");
		}
		if (state > 3) {
			setP4("blueBar");
		} else {
			setP4("noneBar");
		}

	}, [setP1, setP2, setP3, setP4, state]);

	return (
		<div className="MenuProgressBar">
			<div className={P1}></div>
			<div className={P2}></div>
			<div className={P2}></div>
			<div className={P3}></div>
			<div className={P3}></div>
			<div className={P4}></div>
			<div className={P4}></div>
		</div >
	)
}

export default MenuProgressBar;