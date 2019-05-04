import { action } from "mobx";

export interface IEvent {
    target: {
        name: string;
        value: any;
    };
}

export default class VariableChangeHandler {
    @action
    public handleValueChange = (e: IEvent) => {
        if (Object.keys(this).includes(e.target.name)) {
            this[e.target.name] = e.target.value;
        } else {
            throw {
                type: "Fatal",
                message: `Store doesn't include variable ${e.target.name}`,
            };
        }
    }
}
