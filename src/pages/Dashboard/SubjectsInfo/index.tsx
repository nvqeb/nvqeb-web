// MARK: React
import * as React from "react";
import "./style.scss";

// MARK: API
import * as api from "@startapp/nvqeb-user-api";

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

interface IProps {
	routerStore: RouterStore;
	uiStore: UIStore;
	professorsStore: ProfessorsStore;
}

@inject("routerStore", "uiStore", "professorsStore")
@observer
export default class SubjectsInfo extends React.Component<IProps> {
	public render() {
		const { routerStore, professorsStore } = this.props;

		const schoolClass: api.SchoolClass = {
			id: "MATA40",
			description: "Uma descrição qualquer",
			name: "Matemática Discreta",
		};

		const professors: api.Professor[] = [
			{
				id: "123",
				schoolClasses: [schoolClass],
				avatar: null,
				name: "Jenifer",
				tags: ["Tinder"],
				hardness: 10,
			},
		];

		return (
			<><Typography variant="h4"
			style={{
				marginLeft: "auto",
				marginRight: "auto",
				marginTop: 20,
				fontSize: 25,
				backgroundColor: "white",
				width: 270,
			}}>
			{strings.pages.dashboard.professoresDaMateria.title}
		</Typography>
		<div className="professorsPageProfessorsContainer">
			{professors.map((professor) => (
				<div
					className="professorsPageProfessorsContainerProfessorCard"
					key={`professorsPageProfessorsContainerProfessorCard-${professor.id}`}
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
							{professor.tags}
						</Typography>
						<Typography variant="body1">
							{strings.pages.dashboard.professors.professorCard.hardness(professor.hardness)}
						</Typography>
					</div>
				</div>
			))}
		</div>
		<div className="professorPageProfessorContainerCommentBox"
		style={{
			marginLeft: "auto",
			marginRight: "auto",
		}}>
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
										<img
										className="professorPageProfessorContainerCommentBoxUserContainerIcon"
										/>
										<div className="professorPageProfessorContainerCommentBoxInfoContainerUserName">
										<Typography variant="body1"
										style={{
											color: "white",
											fontSize: 17,
										}}>
										{userCommentary.name}
										<br></br>
										</Typography>
										</div>
										<div className="professorPageProfessorContainerCommentBoxInfoContainerCommentary">
										<Typography variant="body1">
										{userCommentary.commentary}
										<br></br><br></br>
										</Typography>
										</div>
								</div>
							</>
						))
						},
						</div>
			</>
		);
	}
}
