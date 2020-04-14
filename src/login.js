import React from "react";
import { Link } from "react-router-dom";
import { useStatefulFields } from "./hooks/useStatefulFields";
import { useAuthSubmit } from "./hooks/useAuthSubmit";

export default function Login() {
    const [values, handleChange] = useStatefulFields();
    const [submit, error] = useAuthSubmit("/login", values);

    return (
        <div>
            <form>
                {error && <div className="error">Something went wrong!</div>}
                <label>Email: </label>
                <input name="email" type="email" onChange={handleChange} />
                <label>Password </label>
                <input
                    name="password"
                    type="password"
                    onChange={handleChange}
                />
                <button onClick={submit}>submit</button>
            </form>
            <Link to="/register">Register</Link>
        </div>
    );
}
