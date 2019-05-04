import * as React from "react";
import strings from "../../resources/strings";
import { DatePicker as MDatePicker } from "material-ui-pickers";
import { IEvent } from "../../resources/VariableChangeHandler";
import { observer } from "mobx-react";

interface IProps {
    label: string;
    name: string;
    value: Date;
    type?: string;
    format?: string;
    disabled?: boolean;
    style?: any;
    onChange: (e: IEvent) => void;
}

const DatePicker = observer((props: IProps) => {
    return (
        <MDatePicker
            keyboard
            label={props.label}
            type={props.type}
            name={props.name}
            margin="normal"
            variant="outlined"
            value={props.value}
            disabled={props.disabled}
            invalidDateMessage={strings.components.datePicker.invalidDate}
            style={{ ...props.style, width: "100%" }}
            mask={(value) => {
                return value ? [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/] : [];
            }}
            format={props.format || strings.format.date}
            onChange={(date: Date) => props.onChange({target: { name: props.name, value: date }})}
        />
    );
});

export default DatePicker;
