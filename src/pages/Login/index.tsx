import * as React from "react";
import "./style.scss";

// Stores
import { observer, inject } from "mobx-react";
import AuthStore from "../../stores/AuthStore";
import UIStore from "../../stores/UIStore";
import { RouterStore } from "mobx-react-router";

// Components
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import Snackbar from "../../components/SnackBar";
import Loading from "../../components/Loading";
import Typography from "@material-ui/core/Typography";

// Resources
import strings from "../../resources/strings";

interface IProps {
	authStore: AuthStore;
	uiStore: UIStore;
	routerStore: RouterStore;
	history: any;
}

@inject("authStore", "uiStore", "routerStore")
@observer
export default class Login extends React.Component<IProps> {
	public componentWillMount = async () => await this.props.authStore.openDashboardIfAuthenticated();

	public render() {
		const { authStore, uiStore, routerStore } = this.props;

		return (
			authStore.loading ?
				<div className="login">
					<Loading />
				</div> :
				<div className="login">
					<Snackbar
						open={uiStore.snackbarOpen}
						message={uiStore.snackBarMessage}
					/>
					<div className="loginCard">
						<Typography variant="h4">Não vá que é barril</Typography>
						<TextField
							label={strings.pages.login.email}
							type="email"
							name="email"
							value={authStore.email}
							onChange={authStore.handleValueChange}
							disabled={authStore.loading}
						/>
						<TextField
							label={strings.pages.login.password}
							type="password"
							name="password"
							value={authStore.password}
							onChange={authStore.handleValueChange}
							disabled={authStore.loading}
						/>
						<Button className="loginButton" onClick={() => authStore.login()}>
							{strings.pages.login.loginButton}
						</Button>
					</div>
				</div>
		);
	}
}
