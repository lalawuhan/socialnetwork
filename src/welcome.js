import React from "react";
import Registration from "./registration";
import Login from "./login";
import ResetPassword from "./resetpassword";
import { HashRouter, Route } from "react-router-dom";
export default class Welcome extends React.Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <h1>Welcome to the splash screen</h1>
                    {/* <Registration /> */}
                    {/* <Login /> */}
                    <Route exact path="/" component={Registration} />
                    <Route exact path="/register" component={Registration} />
                    <Route exact path="/login" component={Login} />
                    <Route
                        exact
                        path="/password/reset/start"
                        component={ResetPassword}
                    />
                </div>
            </HashRouter>
        );
    }
}
