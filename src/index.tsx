import * as React from "react";
import ReactDOM from "react-dom";
import "./style.scss";

// Mobx
import { Provider } from "mobx-react";
import { rootStore } from "./stores/_rootStore";

// Routing
import { Router, Route, Switch, Redirect } from "react-router-dom";
import * as history from "history";
import { syncHistoryWithStore } from "mobx-react-router";
const browserHistory = history.createBrowserHistory();
syncHistoryWithStore(browserHistory, rootStore.routerStore);

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

// Date Picker Config
// Date Picker
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import ptBR from "date-fns/locale/pt-BR";

// API
import * as api from "@startapp/nvqeb-user-api";
api.setUrl("https://api.nvqeb.startapp.one");

ReactDOM.render(
    <Provider {...rootStore}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
            <Router history={rootStore.routerStore.history}>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/" component={Dashboard} />
                </Switch>
            </Router>
        </MuiPickersUtilsProvider>
    </Provider>,
    document.getElementById("app"),
);
