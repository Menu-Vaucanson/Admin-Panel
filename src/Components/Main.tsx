import { Routes, Route } from 'react-router-dom';
import React from 'react';

// @ts-ignore
import MenuBar from './MenuBar.tsx';
// @ts-ignore
import Home from './Home.tsx';
// @ts-ignore
import Infos from './Infos.tsx';
// @ts-ignore
import Admin from './Admin.tsx';
// @ts-ignore
import NewMenu from './MenuCreation/NewMenu.tsx';
// @ts-ignore
import NewMenuValid from './MenuCreation/NewMenuValid.tsx';
// @ts-ignore
import E404 from './E404.tsx';
// @ts-ignore
import AverageRate from './Informations/AverageRate.tsx';
// @ts-ignore
import View from './Informations/View.tsx';
// @ts-ignore
import NumberRate from './Informations/NumberRate.tsx';
// @ts-ignore
import ViewAndNumber from './Informations/ViewAndNumber.tsx';
// @ts-ignore
import SendNewMenu from './MenuCreation/SendNewMenu.tsx';
// @ts-ignore
import DeleteMenu from './MenuCreation/DeleteMenu.tsx';
// @ts-ignore
import DeleteMenuValid from './MenuCreation/DeleteMenuValid.tsx';
// @ts-ignore
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