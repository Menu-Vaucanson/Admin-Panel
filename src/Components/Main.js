import { Routes, Route } from 'react-router-dom';

import Home from './Home.js';
import MenuBar from './MenuBar.js';


function Main() {
	return (
		<div className='App'>
			<MenuBar />
			<Routes>
				{/* <Route path='/' element={<Home />}></Route> */}
			</Routes>
		</div>
	)
}

export default Main;