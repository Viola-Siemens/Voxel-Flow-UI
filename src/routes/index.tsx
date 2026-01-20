import * as React from 'react';
import {
	ToastComponent,
	AlertComponent,
} from 'amis';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { observer } from 'mobx-react';
import { IMainStore } from '@/stores';
import Login from '@/pages/common/Login';
import Register from '@/pages/common/Register';
import MainRoute from '@/pages/main/Dashboard';

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
				<Switch>
					<Route path={`/login`}  component={Login} />
                    <Route path={`/register`}  component={Register} />
					<Route path={'/dashboard'} component={MainRoute} />
				</Switch>
			</div>
		</BrowserRouter>
	);
});