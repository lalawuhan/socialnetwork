import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import {
    Input,
    Button,
    ResetPasswordContainer,
    ResetPasswordDiv,
} from "./styles/standardStyles";

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
        };
    }
    handleChange({ target }) {
        this.setState({
            [target.name]: target.value,
        });
    }

    submit() {
        axios
            .post("/password/reset/start", {
                email: this.state.email,
            })
            .then((res) => {
                console.log("response from submit resetpassword", res);
                this.setState({ step: 2 });
            });
    }

    verifyCode() {
        axios
            .post("/password/reset/verify", {
                password: this.state.password,
                code: this.state.code,
                email: this.state.email,
            })
            .then(({ res }) => {
                console.log("res body in verify code", res);
                this.setState({ step: 3 });
            });
    }

    getCurrentDisplay() {
        if (this.state.step === 1) {
            return (
                <ResetPasswordContainer>
                    <ResetPasswordDiv>
                        {this.state.error && (
                            <div className="error">Error happened</div>
                        )}
                        <h2>Reset Password</h2>

                        <h2>
                            Please enter the email you used for your account
                        </h2>
                        <Input
                            name="email"
                            placeholder="email"
                            onChange={(e) => this.handleChange(e)}
                        />
                        <Button submit onClick={() => this.submit()}>
                            Submit Email
                        </Button>
                        <br />
                    </ResetPasswordDiv>
                </ResetPasswordContainer>
            );
        }

        if (this.state.step === 2) {
            return (
                <ResetPasswordContainer>
                    <ResetPasswordDiv>
                        {this.state.error && (
                            <div className="error">oh no!</div>
                        )}
                        <h2>
                            Please enter the code you received by email below
                        </h2>
                        <Input
                            name="code"
                            onChange={(e) => this.handleChange(e)}
                            key="secret-code"
                        />
                        <h2>
                            Please enter a <strong>new</strong> password
                        </h2>
                        <Input
                            name="password"
                            onChange={(e) => this.handleChange(e)}
                            key="new-password"
                            minLength={6}
                        />
                        <Button submit onClick={() => this.verifyCode()}>
                            Submit
                        </Button>
                        <br />
                    </ResetPasswordDiv>
                </ResetPasswordContainer>
            );
        }

        if (this.state.step === 3) {
            return (
                <ResetPasswordContainer>
                    <ResetPasswordDiv>
                        <h2>Great, you can now login with your new password</h2>
                        <Link to="/login">Log in</Link>
                    </ResetPasswordDiv>
                </ResetPasswordContainer>
            );
        }
    }
    render() {
        return <div>{this.getCurrentDisplay()}</div>;
    }
}
