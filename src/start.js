import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";

ReactDOM.render(
    location.pathname == "/welcome" ? (
        <Welcome />
    ) : (
        <img src="./images/logo.png" alt="logo" />
    ),
    document.querySelector("main")
);
