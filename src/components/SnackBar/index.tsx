// React
import * as React from "react";

// Styles
import "./style.scss";

// Components
import Snackbar from "@material-ui/core/Snackbar";
import { observer } from "mobx-react";

interface IProps {
    open: boolean;
    message: string;
}

@observer
export default class SnackBar extends React.Component<IProps> {
    public render() {
        return (
            <Snackbar
                open={this.props.open}
                message={
                       <h3 style={{color: "white"}}>{this.props.message}</h3>
                }
                ContentProps={{ "aria-describedby": "Alert" }}
            />
        );
    }
}
