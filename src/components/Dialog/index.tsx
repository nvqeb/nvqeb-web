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
		isDialogOpen: boolean;
		onDialogConfirm?: () => void;
		disposeDialog?: () => void;
		dialogMessage: string;
		dialogTitle: string
	};
}

@observer
export default class Dialog extends React.Component<IProps> {
	private onConfirmClick = () => {
		const { onDialogConfirm, disposeDialog } = this.props.uiStore;
		if (onDialogConfirm) {
			onDialogConfirm();
		}

		if (disposeDialog) {
			disposeDialog();
		}
	};

	public render() {
		const { isDialogOpen, disposeDialog, dialogMessage, dialogTitle } = this.props.uiStore;

		return (
			<MDialog
				open={isDialogOpen}
				onClose={disposeDialog}
			>
				<MDialogTitle>{dialogTitle}</MDialogTitle>
				<MDialogContent>
					<MDialogContentText>
						{dialogMessage}
					</MDialogContentText>
				</MDialogContent>
				<MDialogActions>
					<MButton
						onClick={disposeDialog}
						variant="outlined"
					>
						Cancelar
					</MButton>
					<MButton
						onClick={() => this.onConfirmClick()}
						variant="contained"
						autoFocus
					>
						Confirmar
					</MButton>
				</MDialogActions>
			</MDialog>
		);
	}
}
