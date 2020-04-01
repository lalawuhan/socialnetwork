import React from "react";
import Registration from "./registration";
import Login from "./login";
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
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        );
    }
}
