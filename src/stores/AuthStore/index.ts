// MARK: API
import * as api from "@startapp/nvqeb-user-api";

// MARK: Mobx
import { observable, action, computed } from "mobx";
import VariableChangeHandler from "../../resources/VariableChangeHandler";

// MARK: Stores
import { uiStore, routerStore } from "../_rootStore";

// MARK: Resources
import strings from "../../resources/strings";
import { handleError } from "../../resources/handleError";

export default class AuthStore extends VariableChangeHandler {
	// Control
	@observable public user: api.User | null = null;

	// Variables
	@observable public loading: boolean = false;
	@observable public email: string = "";
	@observable public password: string = "";

	constructor() {
		super();

		const user = localStorage.getItem("user");
		this.user = user ? JSON.parse(localStorage.getItem("user") as string) : null;
	}

	@computed
	public get isLoginFormReady() {
		return this.email.length > 5 && this.password.length >= 6;
	}

	@action
	public login = async () => {
		this.loading = true;

		try {
			this.user = await api.login(
				this.email.trim(),
				this.password.trim(),
			);

			localStorage.setItem("user", JSON.stringify(this.user as api.User));
			routerStore.push("/");
		} catch (e) {
			uiStore.openSnackbar(handleError(e));
		} finally {
			this.loading = false;
		}
	}

	@action
	public logout = async () => {
		const onConfirm = async () => {
			try {
				await api.logout();

				this.user = null;
				localStorage.clear();

				routerStore.push("/login");
			} catch (e) {
				uiStore.openSnackbar(handleError(e));
			}
		};

		uiStore.showDialog(
			strings.components.dialogs.logout,
			onConfirm,
		);
	}

	@action
	public isLogged = async () => {
		this.loading = true;
		let user: api.User | null = null;

		try {
			user = await api.getCurrentUser();
		} catch (e) {
			handleError(e);
			localStorage.clear();
		}

		this.loading = false;
		this.user = user;

		return !!this.user;
	}

	@action
	public authenticate = async () => {
		if (!(await this.isLogged())) {
			routerStore.replace("/login");
		}
	}

	@action
	public openDashboardIfAuthenticated = async () => {
		if (await this.isLogged()) {
			routerStore.replace("/");
		}
	}
}
