function CalendarComp({ callback }) {
	return (
		<input onChange={() => {
			const date = document.getElementById("month").value;
			callback(date.split('-')[2]);
		}} className="monthSelection" id="month" type="month" />
	)
}

export default CalendarComp;