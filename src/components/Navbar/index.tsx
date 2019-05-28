// MARK: React
import * as React from "react";
import "./style.scss";

// MARK: React
import { observer, inject } from "mobx-react";

// MARK: Resources
import strings from "../../resources/strings";

// MARK: Components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

// MARK: Icons
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import DashboardIcon from "@material-ui/icons/Dashboard";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

// MARK: Stores
import { RouterStore } from "mobx-react-router";
import AuthStore from "../../stores/AuthStore";

interface IProps {
    routerStore: RouterStore;
    authStore: AuthStore;
}

interface IState {
    open: boolean;
    teamOpen: boolean;
}

@inject("authStore")
@observer
export default class Navbar extends React.Component<IProps, IState> {
    public componentWillMount = () => this.setState({ open: false });
    private handleDrawerOpen = () => this.setState({ open: true });
    private handleDrawerClose = () => this.setState({ open: false });

    public onItemClick = (route: string) => {
        this.props.routerStore.push(route);
        this.handleDrawerClose();
    }

    constructor(props: IProps) {
        super(props);

        this.state = {
            open: false,
            teamOpen: false,
        };
    }

    public render() {
        return (
            <>
                <AppBar position="fixed">
                    <Toolbar className="toolbar">
                        <IconButton className="menuIcon" aria-label="Menu" onClick={this.handleDrawerOpen}>
                            <MenuIcon />
                        </IconButton>
                        <Typography className="title" variant="h5">
                            {strings.navbar.title}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="persistent"
                    anchor="left"
                    className="sidedrawer"
                    open={this.state.open}
                >
                    <div className="closeButtonContainer">
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <List>
                        <ListItem button onClick={() => this.onItemClick("/")}>
                            <ListItemIcon><DashboardIcon /></ListItemIcon>
                            <ListItemText primary={strings.navbar.home} />
                        </ListItem>
                        <ListItem button onClick={this.props.authStore.logout}>
                            <ListItemIcon><KeyboardReturn /></ListItemIcon>
                            <ListItemText primary={strings.navbar.logout} />
                        </ListItem>
                    </List>
                </Drawer>
            </>
        );
    }
}
