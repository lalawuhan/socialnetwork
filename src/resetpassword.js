import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
//conditional rerendering
export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1
        };
    }
    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }

    submit() {
        console.log("submit in resetpassword happening");
        axios
            .post("/password/reset/start", {
                email: this.state.email
            })
            .then(res => {
                console.log("response from submit resetpassword", res);
                this.setState({ step: 2 });
            });
    }

    verifyCode() {
        console.log("verifyCode in resetpassword");
        axios
            .post("/password/reset/verify", {
                password: this.state.password,
                code: this.state.code,
                email: this.state.email
            })
            .then(({ res }) => {
                console.log("res body in verify code", res);
                this.setState({ step: 3 });
            });
    }

    getCurrentDisplay() {
        if (this.state.step === 1) {
            return (
                <div>
                    {this.state.error && <div className="error">Oh no</div>}
                    <h1>Reset Password Fail</h1>
                    Please enter the email you used for your account
                    <input
                        name="email"
                        placeholder="email"
                        onChange={e => this.handleChange(e)}
                    />
                    <button onClick={() => this.submit()}>Submit Email</button>
                    <br />
                </div>
            );
        }

        if (this.state.step === 2) {
            return (
                <div>
                    {this.state.error && <div className="error">oh no!</div>}
                    <h1>Reset Password</h1>
                    <p>Please enter the code you received by email below</p>
                    <input name="code" onChange={e => this.handleChange(e)} />
                    <p>
                        Please enter a <strong>new</strong> password
                    </p>
                    <input
                        name="password"
                        onChange={e => this.handleChange(e)}
                    />
                    <button onClick={() => this.verifyCode()}>Submit</button>
                    <br />
                </div>
            );
        }

        if (this.state.step === 3) {
            return (
                <div>
                    <h2>YAYYYYYYYYYY</h2>
                    <Link to="/login">Log in</Link>
                </div>
            );
        }
    }
    render() {
        return (
            <div>
                <h2>Lorem ipsum heading</h2>
                {this.getCurrentDisplay()}
            </div>
        );
    }
}
