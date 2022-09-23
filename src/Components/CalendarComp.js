function MonthComp({ callback }) {
	function change() {
		const date = document.getElementById("month").value.split('-');
		callback(new Date(date[0], date[1]).getMonth());
	}

	return (
		<input onChange={change} className="monthSelection" id="month" type="month" />
	)
}

export default MonthComp;