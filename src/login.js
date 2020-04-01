import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    submit() {
        axios
            .post("/login", {
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
                {this.state.error && (
                    <div className="error">Oh no! Wrong Password</div>
                )}
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
                <button onClick={() => this.submit()}> Login</button>
                <Link to="/register">Register </Link>
                <Link to="/password/reset/start">Forgot Password? </Link>
            </div>
        );
    }
}
