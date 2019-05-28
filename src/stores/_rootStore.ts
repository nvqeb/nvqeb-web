// MARK: Default Stores
import { RouterStore } from "mobx-react-router";
import UIStore from "./UIStore";
import ProfessorsStore from "./ProfessorsStore";
import AuthStore from "./AuthStore";

export const routerStore =  new RouterStore();
export const uiStore = new UIStore();
export const professorsStore = new ProfessorsStore();
export const authStore = new AuthStore();

export const rootStore = {
	routerStore,
	uiStore,
	professorsStore,
	authStore,
};
