import Refresh from '../../Assets/arrow.svg';

function DayEvening({ callback, callback2, state }) {
    function active() {
        console.log(state);
        callback(!state);
        console.log(!state);
        callback2();

    }
    return (
        <img src={Refresh} alt='days night' className='DayEvening' onClick={active} id='DayEveningButton' />
    )
}
export default DayEvening;