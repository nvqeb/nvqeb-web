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

		this.props.professorsStore.selectProfessor(professorId);
	}

	public render() {
		const { selectedProfessor } = this.props.professorsStore;

		if (!selectedProfessor) {
			routerStore.push("/");

			return <></>;
		}

		return (
			<>
				<div className="professorPage">
					<Typography variant="h4">
						{strings.pages.dashboard.professor.title}
					</Typography>
					<div className="professorPageProfessorContainer">
						<img
							className="professorPageProfessorContainerAvatar"
							src={selectedProfessor.avatar}
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
							{selectedProfessor.classes.map((professorClass) => (
								<div
									className="professorPageProfessorContainerClassesContainerClassCard"
									id={`professorPageProfessorContainerClassesContainerClassCard-${professorClass.id}`}
									onClick={() => {
										routerStore.push(`/classes/SubjectsInfo`);
									}}
								>
									<Typography variant="subtitle1">
										{professorClass.name} - {professorClass.id}
									</Typography>
									<Typography variant="body1">
										{strings.pages.dashboard.professor.professorInfo.classes.classCard.scores.min(professorClass.scores.min)}
									</Typography>
									<Typography variant="body1">
										{strings.pages.dashboard.professor.professorInfo.classes.classCard.scores.mean(professorClass.scores.mean)}
									</Typography>
									<Typography variant="body1">
										{strings.pages.dashboard.professor.professorInfo.classes.classCard.scores.max(professorClass.scores.max)}
									</Typography>
								</div>
							))}
						</div>
						<div className="professorPageProfessorContainerCommentBox">
						{[
						{
							name: "Arthur Fernandes",
							commentary: "Excelente aula, finalmente entendi o assunto!",
						},
						{
							name: "Filipe Arlindo",
							commentary: "Excelente aula, mas a prova é barril",
						},
						{
							name: "Thiago Mariano",
							commentary: "Barril, ném vá",
						},
						].map((userCommentary) => (
							<>
								<div>
										<Typography variant="body1">
										{userCommentary.name}
										<br></br>
										{userCommentary.commentary}
										<br></br><br></br>
										</Typography>
								</div>
							</>
						))
						},
						</div>
					</div>
				</div>
			</>
		);
	}
}
