import React from "react";
import "./style.scss";

// Components
import Autocomplete, { IItem } from "../Autocomplete";
import InputAdornment from "@material-ui/core/InputAdornment";
import { IEvent } from "../../resources/VariableChangeHandler";

import Popover from "@material-ui/core/Popover";
import Chip from "@material-ui/core/Chip";
import { Typography } from "@material-ui/core";

import FilterTextField from "./FilterTextField";
import FilterEnumPicker from "./FilterEnumPicker";
import FilterAutosuggest from "./FilterAutosuggest";
import FilterCheckbox from "./FilterCheckbox";

// Icons
import Add from "@material-ui/icons/Add";

// Resources
import strings from "../../resources/strings";

export interface IFilterField extends IItem {
    type: "textField" | "autosuggest" | "enumPicker" | "checkbox";
    currentValue: string | boolean | null;
    enumPicker?: {
        valueFromOption: (option: string) => any;
        options: string[];
        onChange: (e: IEvent) => void;
    };
    autosuggest?: {
        options: Array<{
            id: string;
            value: string;
        }>;
        loading: boolean;
        onChange: (selectedId: string) => void;
        getOptions: (inputValue: string) => void;
        clearOptions: () => void;
    };
    textField?: {
        onChange: (e: IEvent) => void;
    };
    checkbox?: {
        onChange: (e: IEvent) => void;
    };
    clear: () => void;
}

interface IProps {
    style?: any;
    disabled?: boolean;
    fields: IFilterField[];
}

interface IState {
    selectedFieldId: string | null;
    autocompleteFocus: boolean;
}

export default class Filter extends React.Component<IProps, IState> {
    public componentWillMount = () => {
        this.setState({
            selectedFieldId: null,
            autocompleteFocus: false,
        });
    }

    private autocompleteContainer: HTMLElement | null;

    public render = () => {
        const {
            disabled,
            fields,
        } = this.props;

        const {
            selectedFieldId,
        } = this.state;

        const selectedField = selectedFieldId ? fields.find((field) => field.id === selectedFieldId) : null;

        return (
            <div
                className="filterContainer"
            >
                {(() => {
                    const chipFields = fields.filter((field) => field.currentValue !== null);

                    if (chipFields.length === 0) {
                        return <></>;
                    }

                    return (
                        <div className="chipContainer">
                            {chipFields.map((field) => <Chip
                                className="chip"
                                key={`filter-${field.id}`}
                                label={`${field.value}: ${
                                    typeof field.currentValue === "string" ?
                                        field.currentValue :
                                        (field.currentValue ?
                                            strings.common.yes :
                                            strings.common.no)
                                    }`
                                }
                                onDelete={() => field.clear()}
                            />)}
                        </div>
                    );
                })()}
                {selectedField &&
                    <Popover
                        style={{ minWidth: 300 }}
                        open={!!selectedField}
                        anchorEl={this.autocompleteContainer}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                    >
                        {(() => {
                            switch (selectedField.type) {
                                case "autosuggest": {
                                    return (
                                        <FilterAutosuggest
                                            label={selectedField.value}
                                            disabled={selectedField.autosuggest!.loading}
                                            close={() => {
                                                this.setState({
                                                    selectedFieldId: null,
                                                });
                                            }}
                                            items={selectedField.autosuggest!.options}
                                            onChange={(selectedId) => {
                                                selectedField.autosuggest!.onChange(selectedId);

                                                this.setState({
                                                    selectedFieldId: null,
                                                });
                                            }}
                                            getOptions={selectedField.autosuggest!.getOptions}
                                            clearOptions={selectedField.autosuggest!.clearOptions}
                                        />
                                    );
                                }
                                case "enumPicker": {
                                    return (
                                        <FilterEnumPicker
                                            label={selectedField.value}
                                            initialValue={selectedField.currentValue || ""}
                                            name={selectedField.id}
                                            setValue={(event) => {
                                                this.setState({
                                                    selectedFieldId: null,
                                                });

                                                selectedField.enumPicker!.onChange(event);
                                            }}
                                            close={() => {
                                                this.setState({
                                                    selectedFieldId: null,
                                                });
                                            }}

                                            options={selectedField.enumPicker!.options}
                                            valueFromOption={selectedField.enumPicker!.valueFromOption}
                                        />
                                    );
                                }
                                case "checkbox": {
                                    return (
                                        <FilterCheckbox
                                            label={selectedField.value}
                                            initialValue={typeof selectedField.currentValue === "boolean" ? selectedField.currentValue : true}
                                            name={selectedField.id}
                                            setValue={(event) => {
                                                this.setState({
                                                    selectedFieldId: null,
                                                });

                                                selectedField.checkbox!.onChange(event);
                                            }}
                                            close={() => {
                                                this.setState({
                                                    selectedFieldId: null,
                                                });
                                            }}
                                        />
                                    );
                                }
                                case "textField":
                                default: {
                                    return (
                                        <FilterTextField
                                            label={selectedField.value}
                                            initialValue={typeof selectedField.currentValue === "string" ? selectedField.currentValue : ""}
                                            name={selectedField.id}
                                            setValue={(event) => {
                                                this.setState({
                                                    selectedFieldId: null,
                                                });

                                                selectedField.textField!.onChange(event);
                                            }}
                                            close={() => {
                                                this.setState({
                                                    selectedFieldId: null,
                                                });
                                            }}
                                        />
                                    );
                                }
                            }
                        })()}
                    </Popover>
                }
                <div
                    className="filterAutocompleteContainer"
                    ref={(ref) => {
                        this.autocompleteContainer = ref;
                    }}
                >
                    <Autocomplete
                        onChange={(fieldId) => {
                            this.setState({
                                autocompleteFocus: false,
                            });

                            this.setState({
                                selectedFieldId: fieldId,
                            });
                        }}
                        disabled={!!selectedFieldId || disabled}
                        items={fields.filter((field) => !field.currentValue)}
                        onFocus={() => {
                            this.setState({
                                autocompleteFocus: true,
                            });
                        }}
                        onBlur={() => {
                            this.setState({
                                autocompleteFocus: false,
                            });
                        }}
                        InputProps={{
                            startAdornment: !this.state.autocompleteFocus && (
                                <InputAdornment disablePointerEvents position="start">
                                    <div className="addFilterContainer">
                                        <Add />
                                        <Typography
                                            style={{ marginLeft: 10 }}
                                            color="inherit"
                                            noWrap
                                        >
                                            {strings.components.filter.addFilter}
                                        </Typography>
                                    </div>
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
            </div>
        );
    };
}
