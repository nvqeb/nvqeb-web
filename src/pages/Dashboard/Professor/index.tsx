// MARK: React
import * as React from "react";
import "./style.scss";

// MARK: Router
import { match } from "react-router";

// MARK: Mobx
import { observer, inject } from "mobx-react";

// MARK: Router
import { Route, Switch } from "react-router-dom";

// MARK: Resources
import strings from "../../../resources/strings";

// MARK: Stores
import ProfessorsStore from "../../../stores/ProfessorsStore";
import { routerStore } from "../../../stores/_rootStore";

// MARK: Components
import Typography from "@material-ui/core/Typography";

interface IProps {
	match: match<{ professorId: string }>;
	professorsStore: ProfessorsStore;
}

@inject("routerStore", "uiStore", "professorsStore")
@observer
export default class ProfessorContainer extends React.Component<IProps> {
	public componentDidMount = async () => {
		const { professorId } = this.props.match.params;

		await this.props.professorsStore.selectProfessor(professorId);
	}

	public render() {
		const { selectedProfessor } = this.props.professorsStore;

		if (!selectedProfessor) {
			routerStore.push("/");

			return <></>;
		}

		return (
			<div className="professorPage">
				<div className="professorPageProfessorContainer">
					<img
						className="professorPageProfessorContainerAvatar"
						src={selectedProfessor.avatar ? selectedProfessor.avatar.url : "/userPlaceholder.svg"}
						alt={strings.pages.dashboard.professor.professorInfo.avatarAlt(selectedProfessor.name)}
					/>
					<div className="professorPageProfessorContainerInfoContainer">
						<Typography variant="h4">
							{selectedProfessor.name}
						</Typography>
						<Typography variant="subtitle2">
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
						<Typography variant="h6">
							{strings.pages.dashboard.subjectsInfo.commentariesContainer.title}
						</Typography>
						{[
							{
								user: {
									name: "Arthur Fernandes",
									avatar: null as {url: string} | null,
								},
								commentary: "Excelente aula, finalmente entendi o assunto!",
							},
							{
								user: {
									name: "Filipe Arlindo",
									avatar: null as {url: string} | null,
								},
								commentary: "Excelente aula, mas a prova é barril",
							},
							{
								user: {
									name: "Thiago Mariano",
									avatar: null as {url: string} | null,
								},
								commentary: "Barril, ném vá",
							},
						].map((userCommentary) => (
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
										{userCommentary.commentary}
									</Typography>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}
