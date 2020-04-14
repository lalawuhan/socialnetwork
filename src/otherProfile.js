import React from "react";
import axios from "./axios";
import FriendButton from "./friendbutton";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        console.log("match params id: ", id);
        axios.get(`/user/${id}.json`).then(({ data }) => {
            console.log("response from GET /users/id  ", data);

            if (data.redirect) {
                // redirect
                this.props.history.push("/");
            } else {
                this.setState(data);
            }
        });
    }
    render() {
        return (
            <div>
                <h1>
                    {this.state.first} {this.state.last}
                </h1>
                <p>{this.state.biography}</p>
                <img
                    src={
                        this.state.image_url
                            ? this.state.image_url
                            : "../images/default.png"
                    }
                />
                <FriendButton otherUserId={this.props.match.params.id} />
            </div>
        );
    }
}
