import React from "react";
import Registration from "./registration";

export default class Welcome extends React.Component {
    render() {
        return (
            <div>
                <h1>Welome to the splash screen</h1>
                <p>This is my social media project</p>
                <Registration />
            </div>
        );
    }
}
