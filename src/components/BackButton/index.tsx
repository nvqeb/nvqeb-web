import * as React from "react";
import "./style.scss";

export interface IProps {
    onClick: (() => void);
}

export default class BackButton extends React.Component<IProps> {
    public render = () => (
        <button
            className="back-button"
            aria-label="back_button"
            onClick={() => this.props.onClick()}>❮</button>
    );
}
