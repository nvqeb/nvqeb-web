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

// MARK: Components
import Typography from "@material-ui/core/Typography";

interface IProfessor {
	id: string;
	name: string;
	avatar: string;
	hardness: number;
}

interface IProps {
	routerStore: RouterStore;
	uiStore: UIStore;
}

@inject("routerStore", "uiStore")
@observer
export default class ProfessorsContainer extends React.Component<IProps> {
	public render() {
		const { routerStore } = this.props;

		const professors: IProfessor[] = [
			{
				id: "1",
				name: "Julio Guedes",
				avatar: "/thor.jpg",
				hardness: 10,
			},
			{
				id: "2",
				name: "Vaninha",
				avatar: "/gamora.jpeg",
				hardness: 2,
			},
			{
				id: "3",
				name: "Danilo",
				avatar: "/hulk.jpg",
				hardness: 4,
			},
		];

		return (
			<>
				<div className="professorsPage">
					<Typography variant="h4">
						{strings.pages.dashboard.professors.title}
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
									src={professor.avatar}
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
			</>
		);
	}
}
