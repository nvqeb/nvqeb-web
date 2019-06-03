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
export default class CreateProfessorPage extends React.Component<IProps> {
	public render() {
		return (
			<div className="createProfessorPage">
				<Typography variant="h4">
					Adicionar Professor
				</Typography>
				<div className="createClassPageInfoContainer">
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
				</div>
				<Button>
				{strings.buttons.submit}</Button>
			</div>
		);
	}
}
