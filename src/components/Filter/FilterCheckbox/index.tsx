import React from "react";
import "./style.scss";

// Components
import { IEvent } from "../../../resources/VariableChangeHandler";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { FormControlLabel } from "@material-ui/core";

// Icons
import Close from "@material-ui/icons/Close";

// Resources
import strings from "../../../resources/strings";

interface IProps {
    label: string;
    initialValue?: boolean | null;
    name: string;
    disabled?: boolean;
    setValue: (event: IEvent) => void;
    close: () => void;
}

interface IState {
    value: boolean;
}

export default class FilterCheckbox extends React.Component<IProps, IState> {
    public componentWillMount = () => {
        this.setState({
            value: typeof this.props.initialValue === "boolean" ? this.props.initialValue : true,
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
            <div className="filterCheckboxContainer">
                <div className="filterCheckboxTopBar">
                    <IconButton onClick={close}>
                        <Close />
                    </IconButton>
                </div>
                <div className="filterCheckboxContentContainer">
                    <FormControlLabel
                        label={label}
                        disabled={disabled}
                        control={
                            <Checkbox
                                checked={value}
                                onChange={() => {
                                    this.setState({
                                        value: !value,
                                    });
                                }}
                            />
                        }
                    />
                    <Button onClick={enterAction} disabled={disabled}>{strings.components.filter.apply}</Button>
                </div>
            </div>
        );
    };
}
