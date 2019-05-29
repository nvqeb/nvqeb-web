// MARK: React
import * as React from "react";
import "./style.scss";

// MARK: Router
import { match } from "react-router";

// MARK: API
import * as api from "@startapp/nvqeb-user-api";

// MARK: Mobx
import { observer, inject } from "mobx-react";

// MARK: Resources
import strings from "../../../resources/strings";

// MARK: Stores
import { RouterStore } from "mobx-react-router";
import UIStore from "../../../stores/UIStore";
import SchoolClassesStore from "../../../stores/SchoolClassesStore";

// MARK: Components
import Typography from "@material-ui/core/Typography";
import TextField from "../../../components/TextField";
import Button from "../../../components/Button";

interface IProps {
	match: match<{ classId: string }>;
	routerStore: RouterStore;
	uiStore: UIStore;
	schoolClassesStore: SchoolClassesStore;
}

@inject("routerStore", "uiStore", "schoolClassesStore")
@observer
export default class SubjectsInfo extends React.Component<IProps> {
	public componentDidMount = async () => {
		const { classId } = this.props.match.params;

		await this.props.schoolClassesStore.selectSchoolClass(classId);
		await this.props.schoolClassesStore.getProfessoresForSelectSchoolClass();
	}

	public render() {
		const { schoolClassesStore, routerStore } = this.props;
		const { selectedSchoolClass, selectedSchoolClassProfessores } = schoolClassesStore;

		if (!selectedSchoolClass) {
			return <></>;
		}

		return (
			<div className="subjectInfoPage">
				<div className="subjectInfoPageContainer">
					<div className="subjectInfoPageContainerInfoContainer">
						<Typography variant="h6">
							{selectedSchoolClass.id} - {selectedSchoolClass.name}
						</Typography>
						<Typography variant="body1">
							{selectedSchoolClass.description}
						</Typography>
					</div>
					<Typography variant="h6">
						{strings.pages.dashboard.subjectsInfo.professorsContainer.title}
					</Typography>
					<div className="subjectInfoPageContainerProfessorsContainer">
						{selectedSchoolClassProfessores.map((professor) => (
							<div
								className="subjectInfoPageContainerProfessorsContainerProfessorCard"
								key={`subjectInfoPageContainerProfessorsContainerProfessorCard-${professor.id}`}
								onClick={() => routerStore.push(strings.pages.dashboard.professor.path(professor.id))}
							>
								<img
									className="subjectInfoPageContainerProfessorsContainerProfessorCardAvatar"
									src={professor.avatar ? professor.avatar.url : "/userPlaceholder.svg"}
									alt={strings.pages.dashboard.professors.professorCard.avatarAlt(professor.name)}
								/>
								<div>
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
					<div className="subjectInfoPageContainerCommentariesContainer">
						<Typography variant="h6">
							{strings.pages.dashboard.subjectsInfo.commentariesContainer.title}
						</Typography>
						{schoolClassesStore.commentaries.map((userCommentary) => (
							<div className="subjectInfoPageContainerCommentariesContainerCommentaryCard">
								<img
									className="subjectInfoPageContainerCommentariesContainerCommentaryCardAvatar"
									src={userCommentary.user.avatar ? userCommentary.user.avatar.url : "/userPlaceholder.svg"}
								/>
								<div className="subjectInfoPageContainerCommentariesContainerCommentaryCardInfoContainer">
									<Typography variant="subtitle1">
										{userCommentary.user.name}
									</Typography>
									<Typography variant="body1">
										{userCommentary.commentary}
									</Typography>
								</div>
							</div>
						))}
						<div className="subjectInfoPageContainerCommentariesContainerInputContainer">
							<TextField
								label={strings.textFields.commentary}
								name="commentary"
								type="commentary"
								value={schoolClassesStore.commentary}
								disabled={schoolClassesStore.loading}
								onChange={schoolClassesStore.handleValueChange}
							/>
							<Button
								onClick={() => schoolClassesStore.sendCommentary()}
							>{strings.buttons.commentary}</Button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
