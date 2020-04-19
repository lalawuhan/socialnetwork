import React from "react";
import Registration from "./registration";
import Login from "./login";
import ResetPassword from "./resetpassword";
import { HashRouter, Route } from "react-router-dom";

export default function Welcome() {
    {
        return (
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
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
