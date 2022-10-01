function MonthComp({ callback }) {
	function change() {
		const date = (document.getElementById("month") as HTMLInputElement).value.split('-');
		callback(new Date(Number(date[0]), Number(date[1])).getMonth());
	}

	return (
		<input onChange={change} className="monthSelection" id="month" type="month" />
	);
}

export default MonthComp;