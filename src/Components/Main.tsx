import { Routes, Route } from 'react-router-dom';

import MenuBar from './MenuBar.tsx';
import Home from './Home.tsx';
import Infos from './Infos.tsx';
import Admin from './Admin.tsx';
import NewMenu from './MenuCreation/NewMenu.tsx';
import NewMenuValid from './MenuCreation/NewMenuValid.tsx';
import E404 from './E404.tsx';
import AverageRate from './Informations/AverageRate.tsx';
import View from './Informations/View.tsx';
import NumberRate from './Informations/NumberRate.tsx';
import ViewAndNumber from './Informations/ViewAndNumber.tsx';
import SendNewMenu from './MenuCreation/SendNewMenu.tsx';
import DeleteMenu from './MenuCreation/DeleteMenu.tsx';
import DeleteMenuValid from './MenuCreation/DeleteMenuValid.tsx';
import Platform from './Informations/Platform.tsx';

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