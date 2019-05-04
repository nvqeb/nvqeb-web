// React
import * as React from "react";
import { observer } from "mobx-react";

// Styles
import "./style.scss";

interface IProps {
    hidden?: boolean;
    disabled?: boolean;
    label: string;
    type?: string;
    inputVarName: string;
    value?: string | string[] | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    invalidInput?: boolean;
}

@observer
export default class Input extends React.Component<IProps> {
    public render() {
        const { hidden, label, type, inputVarName, onChange, value, invalidInput, disabled } = this.props;

        return (
            <div className="textInputContainer">
                <label hidden={hidden}><b>{label}</b></label>
                <input
                    disabled={disabled}
                    hidden={hidden}
                    className={`textInputElement${
                        invalidInput !== undefined && invalidInput ? " redBorder" : ""
                    }${
                        disabled !== undefined && disabled ? " disabledBackground" : ""
                    }`}
                    type={type || "text"}
                    name={inputVarName}
                    aria-label={label}
                    aria-labelledby={label}
                    placeholder={label}
                    value={value}
                    onChange={onChange}
                />
            </div>
        );
    }
}
