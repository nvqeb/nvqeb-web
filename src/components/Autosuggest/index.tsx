import React from "react";
import "./style.scss";

// Components
import MDownshift, { DownshiftInterface } from "downshift";
import TextField, { TextFieldProps } from "../TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";

export interface IItem {
    id: string;
    value: string;
}

interface IProps {
    label?: TextFieldProps["label"];
    style?: any;
    disabled?: boolean;
    items: IItem[];

    value?: {
        id: string;
        value: string;
    };
    onChange: (selectedId: string) => void | Promise<void>;
    getOptions: (inputValue: string) => void;
    clearOptions: () => void;
    onBlur?: () => void | Promise<void>;
    onFocus?: () => void | Promise<void>;
    InputProps?: TextFieldProps["InputProps"];
    variant?: TextFieldProps["variant"];
}

interface IState {
    inputValue: string;
}

export default class Autosuggest extends React.Component<IProps, IState> {
    public componentDidMount = () => {
        this.setState({
            inputValue: this.props.value ? this.props.value.value : "",
        });

        this.props.getOptions("");
    }
    public render = () => {
        const Downshift: DownshiftInterface<IItem> = MDownshift;
        return (
            <Downshift
                onInputValueChange={(inputValue) => {
                    this.setState({
                        inputValue,
                    });

                    this.props.clearOptions();
                    setTimeout(() => {
                        if (this.state.inputValue === inputValue) {
                            this.props.getOptions(inputValue);
                        }
                    }, 500);
                }}
                onSelect={(selection) => {
                    if (selection) {
                        this.props.onChange(selection.id);
                    }
                }}
                initialSelectedItem={this.props.value}
                itemToString={(item) => item ? item.value : ""}
            >
                {({
                    getInputProps,
                    getItemProps,
                    getLabelProps,
                    getMenuProps,
                    isOpen,
                    inputValue,
                    highlightedIndex,
                    selectedItem,
                }) => (
                        <div className="autosuggestContainer">
                            <TextField
                                {...getInputProps()}

                                style={{ ...this.props.style }}
                                variant={this.props.variant as any}

                                InputLabelProps={{ ...getLabelProps() }}
                                InputProps={this.props.InputProps}

                                label={this.props.label}
                                disabled={this.props.disabled}
                                onBlur={() => {
                                    if (this.props.onBlur) {
                                        this.props.onBlur();
                                    }
                                }}
                                onFocus={() => {
                                    if (this.props.onFocus) {
                                        this.props.onFocus();
                                    }
                                }}
                            />
                            <div {...getMenuProps()} style={{ width: "100%" }}>
                                {isOpen ?
                                    <Paper
                                        className="autosuggestDropMenuPaper"
                                    >
                                        {this.props.items.map((item, index) => (
                                            <MenuItem
                                                {...getItemProps({
                                                    key: item.id,
                                                    index,
                                                    item,
                                                    style: {
                                                        backgroundColor:
                                                            highlightedIndex === index ? "lightgray" : "white",
                                                        fontWeight: selectedItem === item ? "bold" : "normal",
                                                    },
                                                })}
                                            >
                                                {item.value}
                                            </MenuItem>
                                        ))}
                                    </Paper>
                                    : null
                                }
                            </div>
                        </div>
                    )}
            </Downshift>
        );
    };
}
