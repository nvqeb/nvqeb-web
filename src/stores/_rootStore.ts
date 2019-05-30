// MARK: Default Stores
import { RouterStore } from "mobx-react-router";
import UIStore from "./UIStore";
import ProfessorsStore from "./ProfessorsStore";
import AuthStore from "./AuthStore";
import SchoolClassesStore from "./SchoolClassesStore";
import CreateClassPageStore from "./CreateClassPageStore";

export const routerStore =  new RouterStore();
export const uiStore = new UIStore();
export const professorsStore = new ProfessorsStore();
export const createClassPageStore = new CreateClassPageStore();
export const authStore = new AuthStore();
export const schoolClassesStore = new SchoolClassesStore();

export const rootStore = {
	routerStore,
	uiStore,
	professorsStore,
	authStore,
	schoolClassesStore,
	createClassPageStore,
};
