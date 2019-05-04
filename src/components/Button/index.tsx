import * as React from "react";
import "./style.scss";

interface IProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	revert?: boolean;
	loading?: boolean;
}

export default class Button extends React.Component<IProps, {}> {
	public render() {
		const { className, revert, loading, ...props } = this.props;

		return (
			<button
				{...props}
				className={`${"normalButton"} ${className}`}
				disabled={this.props.loading || this.props.disabled}
			>
				{this.props.children}
			</button>
		);
	}
}
