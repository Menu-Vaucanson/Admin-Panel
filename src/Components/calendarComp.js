function CalendarComp({ callback }) {
    const defaultDate = (new Date().getFullYear()) + '-' + (new Date().getMonth() + 1);
    return (
        <input onChange={() => {
            console.log(document.getElementById("month").value);
            callback(document.getElementById("month").value);
        }} defaultValue={defaultDate} className="monthSelection" id="month" type="month" />
    )
}

export default CalendarComp;