import * as React from "react";
import ReactDOM from "react-dom";
import { IEvent } from "../../resources/VariableChangeHandler";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

interface IProps {
    label: string;
    name: string;
    value: any;
    onChange: (e: IEvent) => void;
    disabled?: boolean;
    style?: any;
    options: string[];
    valueFromOption: (option: string) => any;
}

interface IState {
    labelWidth: number;
}

export default class EnumPicker extends React.Component<IProps, IState> {
    public componentDidMount = () => {
        this.setState({
            labelWidth: this.inputLabelRef ? (ReactDOM.findDOMNode(this.inputLabelRef) as any).offsetWidth : 0 || 0,
        });
    }

    public inputLabelRef: InputLabel | null = null;

    public render = () => {
        return (
            <FormControl
                variant="outlined"
                style={{ width: "100%", ...this.props.style }}
                margin="normal"
                disabled={this.props.disabled}
            >
                <InputLabel
                    ref={(ref) => {
                        this.inputLabelRef = ref;
                    }}
                >{this.props.label}</InputLabel>
                <Select
                    value={this.props.value}
                    onChange={this.props.onChange}
                    variant="outlined"
                    input={
                        <OutlinedInput
                            name={this.props.name}
                            labelWidth={this.state ? this.state.labelWidth : 0}
                        />
                    }
                >
                    {
                        this.props.options.map((option, index) => {
                            const value = this.props.valueFromOption(option);

                            return (
                                <MenuItem
                                    key={`${this.props.name}-menu-item-${value}-${index}`}
                                    value={value}
                                >
                                    {option}
                                </MenuItem>
                            );
                        })
                    }
                </Select>
            </FormControl >
        );
    };
}
