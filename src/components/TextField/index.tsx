import * as React from "react";
import "./style.scss";

// Components
import MTextField, { TextFieldProps as MTextFieldProps } from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

export type TextFieldProps = MTextFieldProps & { errorMessage?: string | null };

export default class TextField extends React.Component<TextFieldProps, {}> {
    public render = () => {
        const { errorMessage, variant, style, ...restProps } = this.props;

        return (
            <div
                className="textFieldContainer"
            >
                <MTextField
                    {...restProps}
                    margin="normal"
                    style={{ width: "100%", ...style }}
                    variant={variant || "outlined" as any}
                >
                    {restProps.children}
                </MTextField>
                {errorMessage &&
                    <Typography
                        className="errorTypography"
                        variant="caption"
                    >
                        {errorMessage}
                    </Typography>
                }
            </div>
        );
    }
}
