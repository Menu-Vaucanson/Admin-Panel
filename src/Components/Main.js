import { Routes, Route } from 'react-router-dom';

import MenuBar from './MenuBar';
import Home from './Home';
import Infos from './Infos';
import Admin from './Admin';
import NewMenu from './MenuCreation/NewMenu';
import NewMenuValid from './MenuCreation/NewMenuValid';
import E404 from './E404';
import AverageRate from './Informations/AverageRate';
import View from './Informations/View';
import NumberRate from './Informations/NumberRate';
import ViewAndNumber from './Informations/ViewAndNumber';
import SendNewMenu from './MenuCreation/SendNewMenu';
import DeleteMenu from './MenuCreation/DeleteMenu';
import DeleteMenuValid from './MenuCreation/DeleteMenuValid';
import Platform from './Informations/Platform';

function Main() {
	return (
		<>
			<MenuBar />
			<div className='App'>
				<Routes>
					<Route path='/' element={<Home />}></Route>
					<Route path='/Infos' element={<Infos />}></Route>
					<Route path='/Infos/AverageRate' element={<AverageRate />}></Route>
					<Route path='/Infos/NumberRate' element={<NumberRate />}></Route>
					<Route path='/Infos/ViewAndNumber' element={<ViewAndNumber />}></Route>
					<Route path='/Infos/View' element={<View />}></Route>
					<Route path='/Infos/Platform' element={<Platform />}></Route>
					<Route path='/Admin' element={<Admin />}></Route>
					<Route path='/NewMenu' element={<NewMenu />}></Route>
					<Route path='/NewMenuValid' element={<NewMenuValid />}></Route>
					<Route path='/SendNewMenu' element={<SendNewMenu />}></Route>
					<Route path='/DeleteMenu' element={<DeleteMenu />}></Route>
					<Route path='/DeleteMenuValid' element={<DeleteMenuValid />}></Route>
					<Route path='/*' element={<E404 />}></Route>
				</Routes>
			</div>
		</>
	)
}

export default Main;