import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";

ReactDOM.render(
    location.pathname == "/welcome" ? <Welcome /> : <App />,
    document.querySelector("main")
);
