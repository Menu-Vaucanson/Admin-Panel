function MonthComp({ callback }) {
	function change() {
		const date = (document.getElementById("month") as HTMLInputElement).value.split('-');
		callback(parseInt(date[1]));
	}

	return (
		<input onChange={change} className="monthSelection" id="month" type="month" />
	);
}

export default MonthComp;