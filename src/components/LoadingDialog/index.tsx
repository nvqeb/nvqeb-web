import * as React from "react";
import "./style.scss";

import MDialog from "@material-ui/core/Dialog";
import MDialogContent from "@material-ui/core/DialogContent";
import MDialogContentText from "@material-ui/core/DialogContentText";
import MDialogTitle from "@material-ui/core/DialogTitle";
import Loading from "../Loading";

import { observer } from "mobx-react";

interface IProps {
	uiStore: {
		loadingDialogOpen: boolean;
		loadingDialogMessage: string;
		loadingDialogTitle: string
	};
}

@observer
export default class LoadingDialog extends React.Component<IProps> {

	public render() {
		const { loadingDialogTitle, loadingDialogMessage, loadingDialogOpen } = this.props.uiStore;

		return (
			<MDialog
				open={loadingDialogOpen}
			>
				<MDialogTitle>{loadingDialogTitle}</MDialogTitle>
				<MDialogContent>
					<div className="loadingDialogContainer">
						<Loading/>
					</div>
					<MDialogContentText>
						{loadingDialogMessage}
					</MDialogContentText>
				</MDialogContent>
			</MDialog>
		);
	}
}
