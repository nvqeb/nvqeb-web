import * as React from "react";
import { observer } from "mobx-react";
import "./style.scss";

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
import BookIcon from "@material-ui/icons/Book";
import PersonIcon from "@material-ui/icons/Person";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

// MARK: Stores
import { RouterStore } from "mobx-react-router";
import strings from "../../resources/strings";

interface IProps {
    routerStore: RouterStore;
}

interface IState {
    open: boolean;
    teamOpen: boolean;
}
// TODO: Make this component receive a list for the menu and only have menu if list is available
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
                            {/* Criação do botão de logout. Puxei a sting pelo destino "srings.navbar.logout" */}
                            <ListItem button onClick={() => this.onItemClick("/")}>
                            <ListItemIcon><DashboardIcon /></ListItemIcon>
                            <ListItemText primary={strings.navbar.logout} />
                            </ListItem>
                    </List>
                </Drawer>
            </>
        );
    }
}
