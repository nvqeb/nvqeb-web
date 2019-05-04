import { observable, action } from "mobx";
import { handleError } from "../../resources/handleError";

export default class UIStore {
    // Variables
    @observable public isAlertOpen: boolean = false;
    @observable public alertTitle: string = "";
    @observable public alertMessage: string = "";
    @observable public onAlertConfirm: () => void = () => { };

    // Methods
    @action
    public showAlert = (alertData: { title: string, message: string }, onConfirm?: () => void) => {
        this.onAlertConfirm = onConfirm || (() => {});
        this.alertTitle = alertData.title;
        this.alertMessage = alertData.message;
        this.isAlertOpen = true;
    }

    @action
    public disposeAlert = () => {
        this.isAlertOpen = false;
        this.onAlertConfirm = () => { };
    }

    @action
    public tooggleAlert = (open: boolean) => {
        this.isAlertOpen = open;
    };

    // Dialog
    @observable public isDialogOpen: boolean = false;
    @observable public dialogTitle: string = "";
    @observable public dialogMessage: string = "";
    @observable public onDialogConfirm: () => void = () => {};

    @action
    public showDialog = (dialogData: { title: string, message: string }, onConfirm?: () => void) => {
        this.onDialogConfirm = onConfirm || (() => {});
        this.dialogTitle = dialogData.title;
        this.dialogMessage = dialogData.message;
        this.isDialogOpen = true;
    }

    @action
    public disposeDialog = () => {

        // Data in the ui is disapearing before dialog close
        this.isDialogOpen = false;
        this.onDialogConfirm = () => { };
    }

    @action
    public tooggleDialog = (open: boolean) => {
        this.isDialogOpen = open;
    };

    // Snackbar
    private SNACKBAR_DURATION: number = 4000;

    @observable
    public snackbarOpen: boolean = false;

    @observable
    public snackBarMessage: string = "";

    @action
    public openErrorSnackbar = (error: any) => {
        this.openSnackbar(handleError(error));
    }

    @action
    public openSnackbar = (message: string) => {
        this.snackBarMessage = message;
        this.snackbarOpen = true;

        setTimeout(
            () => {
                this.snackbarOpen = false;
                this.snackBarMessage = "";
            },
            this.SNACKBAR_DURATION,
        );
    }

    // Loading Dialog

    @observable
    public loadingDialogMessage: string = "";

    @observable
    public loadingDialogOpen: boolean = false;

    @observable
    public loadingDialogTitle: string = "";

    @action
    public openLoadingDialog = (dialogTitle: string, dialogMessage: string) => {
        this.loadingDialogOpen = true;
        this.dialogMessage = dialogMessage;
        this.dialogTitle = dialogTitle;
    }

    @action
    public closeLoadingDialog = () => {
        this.loadingDialogOpen = false;
        this.dialogMessage = "";
        this.dialogTitle = "";
    }

}
