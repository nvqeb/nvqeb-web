import * as React from "react";
import "./style.scss";

interface ILoadingProps {
	type?: "small" | "large";
}

export default class Loading extends React.Component<ILoadingProps> {
	public render() {
		return <div className={`loader${this.props.type === "small" ? " loaderSmall" : ""}`} />;
	}
}
