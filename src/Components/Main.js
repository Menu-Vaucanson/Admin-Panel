import { Routes, Route } from 'react-router-dom';

import Home from './Components/Home';

function Main() {
	return (
		<div>
			<div className='App'>
				<Routes>
					<Route path='/' element={<Home />}></Route>
				</Routes>
			</div>
		</div >
	)
}

export default Main;