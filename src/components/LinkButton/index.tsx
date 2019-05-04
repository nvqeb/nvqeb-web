import * as React from "react";
import "./style.scss";

interface IProps extends React.HTMLProps<HTMLAnchorElement> {
}

export default class LinkButton extends React.Component<IProps, {}> {
	public render() {
		const { className, ...props } = this.props;

		return (
			<a
				{...props}
				className={`${"linkButton"} ${className}`}
			>
				{this.props.children}
			</a>
		);
	}
}
