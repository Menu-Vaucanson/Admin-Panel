import { useState } from 'react';

import Moon from '../../Assets/Moon.svg';
import Sun from '../../Assets/Sun.svg';

function DayEvening({ callback }) {
	const [isEven, setIsEven] = useState(false);
	function active() {
		setIsEven(old => !old);
		callback(!isEven);
	}

	return (
		<img src={isEven ? Moon : Sun} alt='Alterner la vue midi/soir' className='DayEvening' onClick={active} />
	);
}
export default DayEvening;