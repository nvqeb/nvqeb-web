// MARK: Default Stores
import { RouterStore } from "mobx-react-router";
import UIStore from "./UIStore";

export const routerStore =  new RouterStore();
export const uiStore = new UIStore();

export const rootStore = {
	routerStore,
	uiStore,
};
