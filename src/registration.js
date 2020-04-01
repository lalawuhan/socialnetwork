import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    submit() {
        axios
            .post("/register", {
                first: this.state.first,
                last: this.state.last,
                email: this.state.email,
                password: this.state.password
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true //cause react to rerender
                    });
                }
            });
    }
    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }
    render() {
        return (
            <div>
                {this.state.error && <div className="error">Oh no!</div>}
                <label>
                    First Name:
                    <input name="first" onChange={e => this.handleChange(e)} />
                </label>
                <label>
                    Last Name:
                    <input name="last" onChange={e => this.handleChange(e)} />
                </label>
                <label>
                    Email:
                    <input
                        name="email"
                        type="email"
                        onChange={e => this.handleChange(e)}
                    />
                </label>
                <label>
                    Password:
                    <input
                        name="password"
                        type="password"
                        onChange={e => this.handleChange(e)}
                    />
                </label>
                <button onClick={() => this.submit()}> register</button>
                <Link to="/login">Log in </Link>
            </div>
        );
    }
}