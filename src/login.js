import React from "react";
import { Link } from "react-router-dom";
import { useStatefulFields } from "./hooks/useStatefulFields";
import { useAuthSubmit } from "./hooks/useAuthSubmit";
import {
    WelcomeBox,
    WelcomeCol,
    Input,
    Button,
    Form,
    LinkBox,
} from "./styles/standardStyles";
import { useSpring, animated } from "react-spring";

export default function Login() {
    const [values, handleChange] = useStatefulFields();
    const [submit, error] = useAuthSubmit("/login", values);
    const multiAnimation = useSpring({
        from: { opacity: 0, color: "red" },
        to: [
            { opacity: 1, color: "#00C9C8" },
            { opacity: 1, color: "#ED5E93" },
            { opacity: 0.5, color: "#00C9C8" },
            { opacity: 0.8, color: "black" },
        ],
    });
    return (
        <WelcomeBox>
            <WelcomeCol className="login-design"></WelcomeCol>
            <WelcomeCol className="form-col">
                <animated.h1 style={multiAnimation}>Welcome back!</animated.h1>

                <Form onSubmit={submit}>
                    {error && (
                        <div className="error">Something went wrong!</div>
                    )}
                    <label>Email</label>
                    <Input
                        name="email"
                        type="email"
                        required
                        onChange={handleChange}
                    />
                    <label>Password</label>
                    <Input
                        name="password"
                        type="password"
                        required
                        onChange={handleChange}
                    />
                    <Button type="submit" submit>
                        Login
                    </Button>
                </Form>
            </WelcomeCol>
            <LinkBox>
                <Link to="/">Register</Link>
                <Link to="/password/reset/start">Forgot Password?</Link>
            </LinkBox>
        </WelcomeBox>
    );
}
