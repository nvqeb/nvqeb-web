// MARK: React
import * as React from "react";
import "./style.scss";

// MARK: Router
import { match } from "react-router";

// MARK: Mobx
import { observer, inject } from "mobx-react";

// MARK: Resources
import strings from "../../resources/strings";

// MARK: Stores
import { RouterStore } from "mobx-react-router";
import AuthStore from "../../stores/AuthStore";

// MARK: Components
import Typography from "@material-ui/core/Typography";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import Loading from "../../components/Loading";

interface IProps {
	match: match<{ professorId: string }>;
	authStore: AuthStore;
	routerStore: RouterStore;
}

@inject("routerStore", "uiStore", "authStore")
@observer
export default class CreateAccountPage extends React.Component<IProps> {
	public componentWillMount = async () => await this.props.authStore.openDashboardIfAuthenticated();

	public render() {
		const { authStore } = this.props;

		return (
			<div className="createAccountPage">
				{authStore.loading ?
					<Loading /> :
					<>
						<Typography variant="h4">
							Criar Conta
						</Typography>
						<div className="createAccountPageInfoContainer">
							<TextField
								label={strings.textFields.name}
								name="name"
								type="name"
								value={authStore.name}
								onChange={authStore.handleValueChange}
								disabled={authStore.loading}
							/>
							<TextField
								label={strings.textFields.course}
								name="course"
								value={authStore.course}
								onChange={authStore.handleValueChange}
								disabled={authStore.loading}
							/>
							<TextField
								label={strings.textFields.email}
								name="email"
								type="email"
								value={authStore.email}
								onChange={authStore.handleValueChange}
								disabled={authStore.loading}
							/>
							<TextField
								label={strings.textFields.password}
								name="password"
								type="password"
								value={authStore.password}
								onChange={authStore.handleValueChange}
								disabled={authStore.loading}
							/>
						</div>
						<Button
							onClick={() => authStore.createAccount()}
							disabled={authStore.loading}
						>
							{strings.buttons.submit}
						</Button>
					</>
				}
			</div>
		);
	}
}
