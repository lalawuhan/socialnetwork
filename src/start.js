import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";

function App() {
    return (
        <div>
            <Welcome />
        </div>
    );
}
ReactDOM.render(
    location.pathname == "/welcome" ? (
        <App />
    ) : (
        <img src="./images/logo.png" alt="logo" />
    ),
    document.querySelector("main")
);
