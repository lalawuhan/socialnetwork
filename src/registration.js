import React from "react";
import axios from "axios";
//import ReactDOM from "react-dom";

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
                console.log("data here is", data);
                if (data.success) {
                    console.log("successful");
                    //change the location.href, better way = location.replace
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
            </div>
        );
    }
}
