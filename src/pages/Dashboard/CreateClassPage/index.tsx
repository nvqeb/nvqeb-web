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
export default class CreateClassPage extends React.Component<IProps> {
	public render() {
		return (
			<div className="createClassPage">
				<Typography variant="h4">
					Adicionar Matéria
				</Typography>
				<div className="createClassPageInfoContainer">
					<TextField
					label={strings.textFields.subject}
					name="subject"
					type="text"
				/>
				<TextField
					label={strings.textFields.subjectCode}
					name="subjectCode"
					type="text"
				/>
				<TextField
					label={strings.textFields.subjectProfessors}
					name="subjectProfessors"
					type="text"
				/>
				<TextField
					label={strings.textFields.subjectDescpription}
					name="subjectDescpription"
					type="text"
				/>
				</div>
				<Button>
				{strings.buttons.submit}</Button>
			</div>
		);
	}
}
