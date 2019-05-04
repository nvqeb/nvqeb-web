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
import Dashboard from "./pages/Dashboard";

// Date Picker Config
// Date Picker
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import ptBR from "date-fns/locale/pt-BR";

// API
// import * as api from "@startapp/nvqeb-user-api";
// api.setUrl(process.env.NODE_ENV ?
//     ((): string => {
//         switch (process.env.NODE_ENV) {
//             case "production": {
//                 return "https://nvqeb.com.br/admin";
//             }
//             case "staging": {
//                 return "https://nvqeb.com.br/admin";
//             }
//             default:
//             case "development": {
//                 return "https://nvqeb.com.br/admin";
//             }
//         }
//     })() : "https://nvqeb.com.br/admin",
// );

ReactDOM.render(
    <Provider {...rootStore}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
            <Router history={rootStore.routerStore.history}>
                <Switch>
                    <Route path="/" component={Dashboard} />
                </Switch>
            </Router>
        </MuiPickersUtilsProvider>
    </Provider>,
    document.getElementById("app"),
);
