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
import { routerStore } from "../../../stores/_rootStore";

// MARK: Components
import Typography from "@material-ui/core/Typography";
import TextField from "../../../components/TextField";
import Button from "../../../components/Button";
import LinearProgress from "@material-ui/core/LinearProgress";

interface IProps {
	match: match<{ professorId: string }>;
	professorsStore: ProfessorsStore;
}

@inject("routerStore", "uiStore", "professorsStore")
@observer
export default class ProfessorPage extends React.Component<IProps> {
	public componentDidMount = async () => {
		const { professorId } = this.props.match.params;

		await this.props.professorsStore.clear();
		await this.props.professorsStore.selectProfessor(professorId);
		await this.props.professorsStore.getCommentariesForProfessor();
	}

	public render() {
		const { professorsStore } = this.props;
		const { selectedProfessor } = professorsStore;

		if (!selectedProfessor) {
			return <LinearProgress />;
		}

		return (
			<div className="professorPage">
				<div className="professorPageProfessorContainer">
					{professorsStore.loading && <LinearProgress />}
					<div className="professorPageProfessorContainerInfoContainer">
						<img
							className="professorPageProfessorContainerAvatar"
							src={selectedProfessor.avatar ? selectedProfessor.avatar.url : "/userPlaceholder.svg"}
							alt={strings.pages.dashboard.professor.professorInfo.avatarAlt(selectedProfessor.name)}
						/>
						<Typography variant="h4">
							{selectedProfessor.name}
						</Typography>
						<Typography variant="subtitle1">
							{strings.pages.dashboard.professor.professorInfo.hardness(selectedProfessor.hardness)}
						</Typography>
						<div className="professorPageProfessorContainerInfoContainerTagsContainer">
							{selectedProfessor.tags.map((tag, index) =>
								<div
									key={`${selectedProfessor.id}-tag-${index}`}
									style={{
										backgroundColor: ["pink", "deeppink", "hotpink", "lightpink", "magenta", "violet", "orchid"][index % 7],
										padding: "4px",
										margin: "4px",
										borderRadius: "4px",
									}}
								>
									<Typography
										variant="subtitle2"
										style={{
											color: "white",
										}}
									>
										{/* Adicionada a cor branca no texto das tags*/}
										{tag}
									</Typography>
								</div>,
							)}
						</div>
					</div>
					<div className="professorPageProfessorContainerClassesContainer">
						{selectedProfessor.schoolClasses.map((schoolClass) => (
							<div
								className="professorPageProfessorContainerClassesContainerClassCard"
								id={schoolClass.id}
								onClick={() => {
									routerStore.push(`/classes/${schoolClass.id}`);
								}}
							>
								<Typography variant="subtitle2">
									{schoolClass.name} - {schoolClass.id}
								</Typography>
								{/* <Typography variant="body1">
										{strings.pages.dashboard.professor.professorInfo.classes.classCard.scores.min(professorClass.scores.min)}
									</Typography>
									<Typography variant="body1">
										{strings.pages.dashboard.professor.professorInfo.classes.classCard.scores.mean(professorClass.scores.mean)}
									</Typography>
									<Typography variant="body1">
										{strings.pages.dashboard.professor.professorInfo.classes.classCard.scores.max(professorClass.scores.max)}
									</Typography> */}
							</div>
						))}
					</div>
					<div className="professorPageProfessorContainerCommentariesContainer">
						{professorsStore.commentaries.length > 0 &&
							<>
								<Typography variant="h6">
									{strings.pages.dashboard.subjectsInfo.commentariesContainer.title}
								</Typography>
								{professorsStore.commentaries.map((userCommentary) => (
									<div className="professorPageProfessorContainerCommentariesContainerCommentaryCard">
										<img
											className="professorPageProfessorContainerCommentariesContainerCommentaryCardAvatar"
											src={userCommentary.user.avatar ? userCommentary.user.avatar.url : "/userPlaceholder.svg"}
										/>
										<div className="professorPageProfessorContainerCommentariesContainerCommentaryCardInfoContainer">
											<Typography variant="subtitle1">
												{userCommentary.user.name}
											</Typography>
											<Typography variant="body1">
												{userCommentary.text}
											</Typography>
										</div>
									</div>
								))}
							</>
						}
						<div className="professorPageProfessorContainerCommentariesContainerInputContainer">
							<TextField
								label={strings.textFields.commentary}
								name="commentary"
								type="commentary"
								value={professorsStore.commentary}
								disabled={professorsStore.loading}
								onChange={professorsStore.handleValueChange}
							/>
							<Button
								onClick={() => professorsStore.sendCommentary()}
							>{strings.buttons.commentary}</Button>
								{/*disabled={professorsStore.loading}
							>
					{strings.buttons.commentary}*/}
								<Button
								onClick={() => {
									routerStore.push(`/classes/new`);
								}}>Teste</Button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
