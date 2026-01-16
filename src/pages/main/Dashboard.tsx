import {inject, observer} from "mobx-react";
import {withRouter} from "react-router";
import {RouteComponentProps} from "react-router-dom";
import {IMainStore} from "@/stores";
import * as React from "react";

interface DashboardProps extends RouteComponentProps<any> {
	store: IMainStore;
}

@inject("store")
// @ts-ignore
@withRouter
@observer
export default class DashboardRoute extends React.Component<DashboardProps, any> {
	render() {
		return (
			<div>
				<div>Dashboard</div>
			</div>
		);
	}
}