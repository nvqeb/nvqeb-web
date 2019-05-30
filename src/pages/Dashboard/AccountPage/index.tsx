// MARK: React
import * as React from "react";
import "./style.scss";

// MARK: Router
import { match } from "react-router";

// MARK: Mobx
import { observer, inject } from "mobx-react";

// MARK: Resources
import strings from "../../../resources/strings";

// MARK: Stores
import ProfessorsStore from "../../../stores/ProfessorsStore";
import { routerStore, professorsStore } from "../../../stores/_rootStore";

// MARK: Components
import Typography from "@material-ui/core/Typography";
import TextField from "../../../components/TextField";
import Button from "../../../components/Button";

interface IProps {
	match: match<{ professorId: string }>;
	professorsStore: ProfessorsStore;
}

@inject("routerStore", "uiStore", "professorsStore")
@observer
export default class ProfessorContainer extends React.Component<IProps> {

	public render() {

		return (
			<div className="createAccountPage">
				<Typography variant="h4">
					Criar Conta
				</Typography>
				<div className="createAccountPageInfoContainer">
					<TextField
					label={strings.textFields.name}
					name="name"
					type="text"
				/>
				<TextField
					label={strings.textFields.lastname}
					name="lastname"
					type="text"
				/>
				<TextField
					label={strings.textFields.course}
					name="course"
					type="text"
				/>
				<TextField
					label={strings.textFields.email}
					name="email"
					type="text"
				/>
				<TextField
					label={strings.textFields.password}
					name="password"
					type="password"
				/>
				</div>
				<Button>
				{strings.buttons.submit}</Button>
			</div>
		);
	}
}
{/*
				<TextField
					label={strings.textFields.professor}
					name="professor"
					type="text"
				/>
				<TextField
					label={strings.textFields.professorSubject}
					name="professorSubject"
					type="text"
				/>
				<TextField
					label={strings.textFields.professorTags}
					name="professorTags"
					type="text"
				/>
				<Button
>{strings.buttons.submit}</Button> */}
