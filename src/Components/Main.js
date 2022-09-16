import { Routes, Route } from 'react-router-dom';

import MenuBar from './MenuBar.js';
import Home from './Home.js';
import Infos from './Infos.js';
import Admin from './Admin.js';
import NewMenu from './NewMenu.js';
import E404 from './E404.js';


function Main() {
	return (
		<>
			<MenuBar /><div className='App'>
				<Routes>
					<Route path='/' element={<Home />}></Route>
					<Route path='/Infos' element={<Infos />}></Route>
					<Route path='/Admin' element={<Admin />}></Route>
					<Route path='/NewMenu' element={<NewMenu />}></Route>
					<Route path='/*' element={<E404 />}></Route>
				</Routes>
			</div>
		</>
	)
}

export default Main;