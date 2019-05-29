// MARK: React
import * as React from "react";
import "./style.scss";

// MARK: Mobx
import { observer, inject } from "mobx-react";

// MARK: Resources
import strings from "../../../resources/strings";

// MARK: Stores
import { RouterStore } from "mobx-react-router";
import UIStore from "../../../stores/UIStore";
import ProfessorsStore from "../../../stores/ProfessorsStore";

// MARK: Components
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

interface IProps {
	routerStore: RouterStore;
	uiStore: UIStore;
	professorsStore: ProfessorsStore;
}

@inject("routerStore", "uiStore", "professorsStore")
@observer
export default class ProfessorsContainer extends React.Component<IProps> {
	public componentWillMount = async () => {
		const { professorsStore } = this.props;
		await professorsStore.getProfessors();
	}
	public render() {
		const { routerStore, professorsStore } = this.props;
		const { professors, pageOffset } = professorsStore;

		return (
			<div className="professorsPage">
				<div className="professorsPageButtonsContainer">
					{pageOffset > 0 &&
						<Button onClick={() => professorsStore.previousPage()}>{strings.buttons.previous}</Button>
					}
					<Button onClick={() => professorsStore.nextPage()}>{strings.buttons.next}</Button>
				</div>
				<Typography variant="h4">
					{strings.pages.dashboard.professors.title}
				</Typography>
				<div className="professorsPageProfessorsContainer">
					{professors.map((professor) => (
						<div
							className="professorsPageProfessorsContainerProfessorCard"
							key={professor.id}
							onClick={() => routerStore.push(strings.pages.dashboard.professor.path(professor.id))}
						>
							<img
								className="professorsPageProfessorsContainerProfessorCardAvatar"
								src={professor.avatar ? professor.avatar.url : "/userPlaceholder.svg"}
								alt={strings.pages.dashboard.professors.professorCard.avatarAlt(professor.name)}
							/>
							<div className="professorsPageProfessorsContainerProfessorCardInfoContainer">
								<Typography variant="subtitle1">
									{professor.name}
								</Typography>
								<Typography variant="body1">
									{strings.pages.dashboard.professors.professorCard.hardness(professor.hardness)}
								</Typography>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}
}
