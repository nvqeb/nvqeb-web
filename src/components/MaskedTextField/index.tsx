import * as React from "react";

// Components
import TextField, { TextFieldProps } from "../TextField";
import InputMask, { InputState, MaskOptions } from "react-input-mask";

export type MaskedTextFieldProps = TextFieldProps & {
    mask: string,
    maskChar?: string,
    value: string | number | string[],
    isMaskComplete?: (
        newState: InputState,
        oldState: InputState,
        userInput: string | null,
        maskOptions: MaskOptions,
    ) => boolean;
    onMaskComplete?: (inputValue: string) => void;
};

export default class MaskedTextField extends React.Component<MaskedTextFieldProps, {}> {
    public render = () => {
        const { mask, maskChar, onChange, value, disabled, isMaskComplete, onMaskComplete, ...restProps } = this.props;
        const inputMaskChar = maskChar || " ";

        return (
            <InputMask
                mask={mask}
                maskChar={inputMaskChar}
                onChange={onChange}
                value={value}
                disabled={disabled}
                alwaysShowMask={false}
                beforeMaskedValueChange={(
                    newState,
                    oldState,
                    userInput,
                    maskOptions,
                ) => {
                    if (onMaskComplete && userInput !== null && newState.value !== oldState.value) {
                        if (isMaskComplete) {
                            if (isMaskComplete(newState, oldState, userInput, maskOptions)) {
                                onMaskComplete(newState.value);
                            }
                        } else {
                            if (newState.value.split(inputMaskChar).join("").length === mask.length) {
                                onMaskComplete(newState.value);
                            }
                        }
                    }

                    return newState;
                }}
            >
                {(inputProps) => (
                    <TextField
                        {...inputProps}
                        {...restProps}
                        ref={(restProps.name)}
                        disabled={disabled}
                    >
                        {restProps.children}
                    </TextField>
                )}
            </InputMask>
        );
    }
}
