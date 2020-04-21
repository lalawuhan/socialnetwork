import React from "react";
import { Link } from "react-router-dom";
import { useStatefulFields } from "./hooks/useStatefulFields";
import { useAuthSubmit } from "./hooks/useAuthSubmit";
import {
    WelcomeBox,
    WelcomeCol,
    Form,
    Input,
    Button,
    LinkBox,
    RegisterText,
} from "./styles/standardStyles";

export default function Registration() {
    const [values, handleChange] = useStatefulFields();
    const [submit, error] = useAuthSubmit("/register", values);

    return (
        <WelcomeBox>
            <WelcomeCol className="text-col">
                <h1>Vast Void</h1>{" "}
                <RegisterText>
                    A place to have open conversations and meet people from
                    everywhere. You will be most likely talking to yourself on
                    our platform, but that is ok. Welcome to Vastly Void. Enjoy
                    your journey here.
                </RegisterText>
                <RegisterText>
                    P.S. Talking with yourself not only relieves the loneliness,
                    it may also make you smarter. It helps you clarify your
                    thoughts, helps you tend to what is important in your life.{" "}
                </RegisterText>
            </WelcomeCol>
            <WelcomeCol className="form-col">
                <Form onSubmit={submit}>
                    {error && (
                        <div className="error">Something went wrong!</div>
                    )}
                    <label>First Name: </label>
                    <Input name="first" required onChange={handleChange} />
                    <label>Last Name: </label>
                    <Input name="last" required onChange={handleChange} />
                    <label>Email: </label>
                    <Input
                        name="email"
                        type="email"
                        required
                        onChange={handleChange}
                    />
                    <label>Password </label>
                    <Input
                        name="password"
                        type="password"
                        required
                        onChange={handleChange}
                        minLength={6}
                    />
                    <Button submit type="submit">
                        Register
                    </Button>
                </Form>
            </WelcomeCol>
            <LinkBox>
                <Link to="/login">Log in </Link>
            </LinkBox>
        </WelcomeBox>
    );
}
