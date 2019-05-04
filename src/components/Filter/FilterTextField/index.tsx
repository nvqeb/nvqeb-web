import React from "react";
import "./style.scss";

// Components
import TextField from "../../TextField";
import { IEvent } from "../../../resources/VariableChangeHandler";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

// Icons
import Close from "@material-ui/icons/Close";

// Resources
import strings from "../../../resources/strings";

interface IProps {
    label: string;
    initialValue?: string | null;
    name: string;
    disabled?: boolean;
    setValue: (event: IEvent) => void;
    close: () => void;
}

interface IState {
    value: string;
}

export default class FilterTextField extends React.Component<IProps, IState> {
    public componentWillMount = () => {
        this.setState({
            value: this.props.initialValue || "",
        });
    }

    public render = () => {
        const {
            disabled,
            label,
            name,
            setValue,
            close,
        } = this.props;

        const {
            value,
        } = this.state;

        const enterAction = () => {
            setValue({
                target: {
                    name,
                    value: this.state.value,
                },
            });
        };

        const handleKeyPress = (e) => {
            if (e.key === "Enter") {
                enterAction();
            }
        };

        return (
            <div className="filterTextFieldContainer">
                <div className="filterTextFieldTopBar">
                    <IconButton onClick={close}>
                        <Close/>
                    </IconButton>
                </div>
                <div className="filterTextFieldContentContainer">
                    <TextField
                        label={label}
                        value={value}
                        disabled={disabled}
                        onChange={(newValue) => {
                            this.setState({
                                value: newValue.target.value,
                            });
                        }}
                        onKeyPress={handleKeyPress}
                    />
                    <Button onClick={enterAction} disabled={value.trim().length === 0}>{strings.components.filter.apply}</Button>
                </div>
            </div>
        );
    };
}
