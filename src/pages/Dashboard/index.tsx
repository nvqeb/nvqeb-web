import * as React from "react";

// MARK: Mobx
import { observer, inject } from "mobx-react";

// MARK: Router
import { Route, Switch } from "react-router-dom";

// MARK: Stores
import { RouterStore } from "mobx-react-router";
import UIStore from "../../stores/UIStore";
import AuthStore from "../../stores/AuthStore";

// MARK: Pages
import ProfessorsPage from "./Professors";
import ProfessorPage from "./Professor";
import SubjectsInfoPage from "./SubjectsInfo";

// MARK: Components
import Navbar from "../../components/Navbar";
import { Toolbar } from "@material-ui/core";
import Alert from "../../components/Alert";
import Dialog from "../../components/Dialog";
import Snackbar from "../../components/SnackBar";
import LoadingDialog from "../../components/LoadingDialog";
import CreateClassPage from "./CreateClassPage";

interface IProps {
	routerStore: RouterStore;
	uiStore: UIStore;
	authStore: AuthStore;
}

@inject("routerStore", "uiStore", "authStore")
@observer
export default class Dashboard extends React.Component<IProps> {
	public componentWillMount = async () => {
		await this.props.authStore.authenticate();
	}

	public render() {
		const { uiStore, routerStore } = this.props;

		return (
			<>
				<Navbar />
				<Toolbar />
				<Switch>
					<Route exact path="/" component={ProfessorsPage} />
					<Route exact path="/professors" component={ProfessorPage} />
					<Route path="/professors/:professorId" component={ProfessorPage} />
					<Route exact path="/classes/new" component={CreateClassPage} />
					<Route path="/classes/:classId" component={SubjectsInfoPage} />

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
