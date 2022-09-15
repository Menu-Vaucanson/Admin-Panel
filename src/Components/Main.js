import { Routes, Route } from 'react-router-dom';

import Home from './Home.js';
import MenuBar from './MenuBar.js';


function Main() {
	return (
		<>
			<MenuBar /><div className='App'>
				<Routes>
					<Route path='/' element={<Home />}></Route>
				</Routes>
			</div>
		</>
	)
}

export default Main;