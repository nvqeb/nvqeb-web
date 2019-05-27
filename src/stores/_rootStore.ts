// MARK: Default Stores
import { RouterStore } from "mobx-react-router";
import UIStore from "./UIStore";
import ProfessorsStore from "./ProfessorsStore";

export const routerStore =  new RouterStore();
export const uiStore = new UIStore();
export const professorsStore = new ProfessorsStore();

export const rootStore = {
	routerStore,
	uiStore,
	professorsStore,
};
