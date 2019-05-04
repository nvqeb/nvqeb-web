import * as React from "react";
import "./style.scss";

// MARK: Router
import { Route, Switch } from "react-router-dom";

// MARK: Components
import Typography from "@material-ui/core/Typography";

// MARK: Resources
import strings from "../../../resources/strings";

interface IClass {
	name: string;
	code: string;
	scores: {
		min: number;
		mean: number;
		max: number;
	};
}

interface IProfessor {
	id: string;
	name: string;
	avatar: string;
	hardness: number;
	classes: IClass[];
}

export default class ProfessorContainer extends React.Component {
	public render() {
		const professor: IProfessor = {
			id: "1",
			name: "Julio Guedes",
			avatar: "/thor.jpg",
			hardness: 10,
			classes: [
				{
					name: "Física 1",
					code: "FIS121",
					scores: {
						min: 0,
						mean: 2,
						max: 6,
					},
				},
				{
					name: "Física 2",
					code: "FIS122",
					scores: {
						min: 0,
						mean: 1.5,
						max: 5,
					},
				},
				{
					name: "Física 3",
					code: "FIS123",
					scores: {
						min: 0,
						mean: 1.5,
						max: 4,
					},
				},
			],
		};

		return (
			<>
				<div className="professorPage">
					<Typography variant="h4">
						{strings.pages.dashboard.professor.title}
					</Typography>
					<div className="professorPageProfessorContainer">
						<img
							className="professorPageProfessorContainerAvatar"
							src={professor.avatar}
							alt={strings.pages.dashboard.professor.professorInfo.avatarAlt(professor.name)}
						/>
						<div className="professorPageProfessorContainerInfoContainer">
							<Typography variant="h4">
								{professor.name}
							</Typography>
							<Typography variant="subtitle2">
								{strings.pages.dashboard.professor.professorInfo.hardness(professor.hardness)}
							</Typography>
						</div>
						<div className="professorPageProfessorContainerClassesContainer">
							{professor.classes.map((professorClass) => (
								<div
									className="professorPageProfessorContainerClassesContainerClassCard"
									id={`professorPageProfessorContainerClassesContainerClassCard-${professorClass.code}`}
								>
									<Typography variant="subtitle1">
										{professorClass.name} - {professorClass.code}
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
					</div>
				</div>
			</>
		);
	}
}
