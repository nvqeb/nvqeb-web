import React from "react";
import "./style.scss";

// Components
import EnumPicker from "../../EnumPicker";
import { IEvent } from "../../../resources/VariableChangeHandler";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

// Icons
import Close from "@material-ui/icons/Close";

// Resources
import strings from "../../../resources/strings";

interface IProps {
    label: string;
    initialValue?: any;
    name: string;
    disabled?: boolean;
    setValue: (event: IEvent) => void;
    close: () => void;

    options: string[];
    valueFromOption: (option: string) => any;
}

interface IState {
    value: any;
    valueString: string;
}

export default class FilterEnumPicker extends React.Component<IProps, IState> {
    public componentWillMount = () => {
        this.setState({
            value: this.props.initialValue,
            valueString: "",
        });
    }

    public render = () => {
        const {
            disabled,
            label,
            name,
            setValue,
            close,
            options,
            valueFromOption,
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

        return (
            <div className="filterEnumPickerContainer">
                <div className="filterEnumPickerTopBar">
                    <IconButton onClick={close}>
                        <Close/>
                    </IconButton>
                </div>
                <div className="filterEnumPickerContentContainer">
                    <EnumPicker
                        label={label}
                        name={name}
                        value={value}
                        disabled={disabled}
                        onChange={(newValue) => {
                            this.setState({
                                value: newValue.target.value,
                            });
                        }}
                        options={options}
                        valueFromOption={valueFromOption}
                    />
                    <Button
                        onClick={enterAction}
                        disabled={value.trim().length === 0}
                    >
                        {strings.components.filter.apply}
                    </Button>
                </div>
            </div>
        );
    };
}
