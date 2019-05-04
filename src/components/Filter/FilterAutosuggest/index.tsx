import React from "react";
import "./style.scss";

// Components
import Autosuggest, { IItem } from "../../Autosuggest";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

// Icons
import Close from "@material-ui/icons/Close";

// Resources
import strings from "../../../resources/strings";

interface IProps {
    label: string;
    disabled?: boolean;
    close: () => void;

    items: IItem[];
    onChange: (selectedId: string) => void;
    getOptions: (inputValue: string) => void;
    clearOptions: () => void;
}

interface IState {
    selectedId: string | null;
    valueString: string;
}

export default class FilterAutosuggest extends React.Component<IProps, IState> {
    public componentWillMount = () => {
        this.setState({
            selectedId: null,
        });
    }

    public render = () => {
        const {
            disabled,
            label,
            close,
            items,
            onChange,
            getOptions,
            clearOptions,
        } = this.props;

        return (
            <div className="filterAutosuggestContainer">
                <div className="filterAutosuggestTopBar">
                    <IconButton onClick={close}>
                        <Close/>
                    </IconButton>
                </div>
                <div className="filterAutosuggestContentContainer">
                    <Autosuggest
                        label={label}
                        disabled={disabled}
                        onChange={(selectedId) => {
                            this.setState({
                                selectedId,
                            });
                        }}
                        items={items}

                        getOptions={getOptions}
                        clearOptions={clearOptions}
                    />
                    <Button
                        onClick={() => onChange(this.state.selectedId!)}
                        disabled={!this.state.selectedId}
                    >
                        {strings.components.filter.apply}
                    </Button>
                </div>
            </div>
        );
    };
}
