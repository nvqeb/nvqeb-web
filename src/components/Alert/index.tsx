import * as React from "react";
import "./style.scss";

import MDialog from "@material-ui/core/Dialog";
import MDialogActions from "@material-ui/core/DialogActions";
import MDialogContent from "@material-ui/core/DialogContent";
import MDialogContentText from "@material-ui/core/DialogContentText";
import MDialogTitle from "@material-ui/core/DialogTitle";
import MButton from "@material-ui/core/Button";

import { observer } from "mobx-react";

interface IProps {
	uiStore: {
		isAlertOpen: boolean;
		onAlertConfirm?: () => void;
		disposeAlert?: () => void;
		alertMessage: string;
		alertTitle: string
	};
}

@observer
export default class Alert extends React.Component<IProps> {
	private onConfirmClick = () => {
		const { onAlertConfirm, disposeAlert } = this.props.uiStore;

		if (onAlertConfirm) {
			onAlertConfirm();
		}

		if (disposeAlert) {
			disposeAlert();
		}
	};

	public render() {
		const { isAlertOpen, disposeAlert, alertMessage, alertTitle } = this.props.uiStore;

		return (
			<MDialog
				open={isAlertOpen}
				onClose={disposeAlert}
			>
				<MDialogTitle>{alertTitle}</MDialogTitle>
				<MDialogContent>
					<MDialogContentText>
						{alertMessage}
					</MDialogContentText>
				</MDialogContent>
				<MDialogActions>
					<MButton
						onClick={() => this.onConfirmClick()}
						variant="contained"
						autoFocus
					>
						Ok
					</MButton>
				</MDialogActions>
			</MDialog>
		);
	}
}
