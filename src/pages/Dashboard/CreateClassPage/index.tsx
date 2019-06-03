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
import SchoolClassesStore from "../../../stores/SchoolClassesStore";

// MARK: Components
import Typography from "@material-ui/core/Typography";
import TextField from "../../../components/TextField";
import Button from "../../../components/Button";

interface IProps {
	match: match<{ professorId: string }>;
	schoolClassesStore: SchoolClassesStore;
}

@inject("routerStore", "uiStore", "schoolClassesStore")
@observer
export default class CreateClassPage extends React.Component<IProps> {
	public render() {
		const { schoolClassesStore } = this.props;

		return (
			<div className="createClassPage">
				<Typography variant="h4">
					Adicionar Matéria
				</Typography>
				<div className="createClassPageInfoContainer">
					<TextField
						label={strings.textFields.subject}
						name="name"
						value={schoolClassesStore.name}
						onChange={schoolClassesStore.handleValueChange}
						disabled={schoolClassesStore.loading}
					/>
					<TextField
						label={strings.textFields.subjectCode}
						name="id"
						value={schoolClassesStore.id}
						onChange={schoolClassesStore.handleValueChange}
						disabled={schoolClassesStore.loading}
					/>
					<TextField
						label={strings.textFields.subjectDescpription}
						name="description"
						value={schoolClassesStore.description}
						onChange={schoolClassesStore.handleValueChange}
						disabled={schoolClassesStore.loading}
					/>
				</div>
				<Button
					onClick={() => schoolClassesStore.createSchoolClass()}
				>
					{strings.buttons.submit}
				</Button>
			</div>
		);
	}
}
