import * as React from 'react';
import {
	ToastComponent,
	AlertComponent,
} from 'amis';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { observer } from 'mobx-react';
import { IMainStore } from '@/stores';
import Login from '@/pages/common/Login';
import Register from '@/pages/common/Register';
import MainRoute from '@/pages/main/Dashboard';
import ReqList from '@/pages/main/req/List'
import NotFound from '@/pages/common/404'

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

export default observer(function({store}:{
	store:IMainStore
}) {
	return (
		<BrowserRouter>
			<div className="routes-wrapper">
				<ToastComponent key="toast" position={'top-right'} theme={store.theme} />
				<AlertComponent key="alert" theme={store.theme} />
				<Routes>
                    <Route path={'/'} Component={MainRoute} />
					<Route path={`/login`} Component={Login} />
                    <Route path={`/register`} Component={Register} />
					<Route path={'/dashboard'} Component={MainRoute} />
                    <Route path={'/list/req'} Component={ReqList} />
                    {/* 404: must be on the bottom */}
                    <Route path={'*'} Component={NotFound} />
				</Routes>
			</div>
		</BrowserRouter>
	);
});