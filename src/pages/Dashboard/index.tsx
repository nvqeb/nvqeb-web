import * as React from "react";

// MARK: Mobx
import { observer, inject } from "mobx-react";

// MARK: Router
import { Route, Switch } from "react-router-dom";

// MARK: Stores
import { RouterStore } from "mobx-react-router";
import UIStore from "../../stores/UIStore";

// MARK: Pages
import ProfessorsPage from "./Professors";
import ProfessorPage from "./Professor";

// MARK: Components
import Navbar from "../../components/Navbar";
import { Toolbar } from "@material-ui/core";
import Alert from "../../components/Alert";
import Dialog from "../../components/Dialog";
import Snackbar from "../../components/SnackBar";
import LoadingDialog from "../../components/LoadingDialog";

interface IProps {
	routerStore: RouterStore;
	uiStore: UIStore;
}

@inject("routerStore", "uiStore")
@observer
export default class Dashboard extends React.Component<IProps> {
	public render() {
		const { uiStore, routerStore } = this.props;

		return (
			<>
				<Navbar
					routerStore={routerStore}
				/>
				<Toolbar />
				<Switch>
					<Route exact path="/" component={ProfessorsPage} />
					<Route path="/professors/:professorId" component={ProfessorPage} />
				</Switch>
				<Alert uiStore={uiStore} />
				<Dialog uiStore={uiStore} />
				<LoadingDialog uiStore={uiStore} />
				<Snackbar
					open={uiStore.snackbarOpen}
					message={uiStore.snackBarMessage}
				/>
			</>
		);
	}
}
