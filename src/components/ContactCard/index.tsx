import * as React from "react";
import "./style.scss";

// Components
import { Paper, Typography } from "@material-ui/core";

// Icons
import Phone from "@material-ui/icons/Phone";
import Mail from "@material-ui/icons/Mail";

export interface IProps {
    name: string;
    role?: string | null;
    phone?: string | null;
    email?: string | null;
}

export default class ContactCard extends React.Component<IProps> {
    public render = () => {
        const { name, role, phone, email } = this.props;

        return (
            <Paper className="superiorCardContainer">
                <Typography variant="h5">{name}</Typography>
                {role &&
                    <Typography variant="h6">{role}</Typography>
                }
                <div className="contactsContainer">
                    {phone !== "" &&
                        <div className="contactContainer">
                            <Phone fontSize="large" />
                            {phone}
                        </div>
                    }
                    {email &&
                        <div className="contactContainer">
                            <Mail fontSize="large" />
                            {email}
                        </div>
                    }
                </div>
            </Paper>
        );
    }
}
