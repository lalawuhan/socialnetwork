import React from "react";
import { Link } from "react-router-dom";
import { useStatefulFields } from "./hooks/useStatefulFields";
import { useAuthSubmit } from "./hooks/useAuthSubmit";

export default function Registration() {
    const [values, handleChange] = useStatefulFields();
    const [submit, error] = useAuthSubmit("/register", values);

    return (
        <form>
            {error && <div className="error">Something went wrong!</div>}
            <label>First Name: </label>
            <input name="first" onChange={handleChange} />
            <label>Last Name: </label>
            <input name="last" onChange={handleChange} />
            <label>Email: </label>
            <input name="email" type="email" onChange={handleChange} />
            <label>Password </label>
            <input name="password" type="password" onChange={handleChange} />
            <button onClick={submit}>submit</button>
            <Link to="/login">Log in </Link>
        </form>
    );
}
