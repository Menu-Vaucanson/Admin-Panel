import { Routes, Route } from 'react-router-dom';

import Home from './Home.js';
import Infos from './Infos.js';
import MenuBar from './MenuBar.js';


function Main() {
	return (
		<>
			<MenuBar /><div className='App'>
				<Routes>
					<Route path='/' element={<Home />}></Route>
					<Route path='/Infos' element={<Infos />}></Route>
				</Routes>
			</div>
		</>
	)
}

export default Main;