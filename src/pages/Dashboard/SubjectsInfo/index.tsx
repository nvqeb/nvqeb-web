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

		return (
			<>
			
			</>
		);
	}
}
