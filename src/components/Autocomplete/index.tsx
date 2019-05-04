import React from "react";
import "./style.scss";

// Components
import MDownshift, { DownshiftInterface } from "downshift";
import TextField, { TextFieldProps } from "../TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";

// Resources
import { getRegexSearchStringOptionsFromRawString } from "../../resources/regex";

export interface IItem {
    id: string;
    value: string;
}

interface IProps {
    style?: any;
    disabled?: boolean;
    items: IItem[];
    onChange: (selectedValue: string) => void | Promise<void>;
    onBlur?: () => void | Promise<void>;
    onFocus?: () => void | Promise<void>;
    InputProps?: TextFieldProps["InputProps"];
    variant?: TextFieldProps["variant"];
    label?: TextFieldProps["label"];
}

interface IState {
    inputValue: string;
}

const Downshift: DownshiftInterface<IItem> = MDownshift;

export default class Autocomplete extends React.Component<IProps, IState> {
    public componentDidMount = () => {
        this.setState({
            inputValue: "",
        });
    }

    // TODO: Remove this any
    private downshift: any;

    public render = () => {
        return (
            <Downshift
                ref={(downshift) => {
                    if (downshift)
                        this.downshift = downshift;
                }}
                onInputValueChange={(inputValue) => {
                    this.setState({
                        inputValue,
                    });
                }}
                onSelect={(selection) => {
                    if (selection) {
                        this.props.onChange(selection.id);
                        this.downshift.clearSelection();
                    } else {
                        this.setState({
                            inputValue: "",
                        });
                    }
                }}
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
                        <div className="autocompleteContainer">
                            <TextField
                                {...getInputProps()}

                                style={{ ...this.props.style }}
                                variant={this.props.variant || "standard" as any}

                                InputLabelProps={{ ...getLabelProps() }}
                                InputProps={this.props.InputProps}

                                label={this.props.label}
                                disabled={this.props.disabled}
                                onBlur={this.props.onBlur}
                                onFocus={this.props.onFocus}
                            />
                            <div {...getMenuProps()} style={{ width: "100%" }}>
                                {isOpen
                                    ?
                                    <Paper
                                        className="autocompleteDropMenuPaper"
                                    >
                                        {this.props.items
                                            .filter((item) => {
                                                if (inputValue && inputValue !== "") {
                                                    return getRegexSearchStringOptionsFromRawString(inputValue)
                                                        .map((regexValue) => {
                                                            return item.value.toLowerCase().match(regexValue);
                                                        })
                                                        .reduce((l, r) => l && r);
                                                } else {
                                                    return true;
                                                }
                                            })
                                            .map((item, index) => (
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
                                    : null}
                            </div>
                        </div>
                    )}
            </Downshift>
        );
    };
}
