import React from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Profile from "./profile";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        var self = this;
        axios
            .get("/user")
            .then(function(response) {
                self.setState(response.data);
            })
            .catch(function(error) {
                console.log("error in get(/user) app.js", error);
            });
    }
    render() {
        return (
            <React.Fragment>
                <ProfilePic
                    image_url={this.state.image_url}
                    toggleModal={() =>
                        this.setState({
                            uploaderVisibility: !this.state.uploaderVisibility
                        })
                    }
                />
                {this.state.uploaderVisibility && (
                    <Uploader
                        changeImageUrl={image_url =>
                            this.setState({
                                image_url: image_url,
                                uploaderVisibility: false
                            })
                        }
                    />
                )}
                <Profile
                    first={this.state.first}
                    last={this.state.last}
                    addBio={this.state.biography}
                    setBio={addBio => this.setState({ biography: addBio })}
                    image_url={this.state.image_url}
                    profilePic={
                        <ProfilePic
                            first={this.state.first}
                            last={this.state.last}
                            image_url={this.state.image_url}
                            toggleModal={() =>
                                this.setState({
                                    uploaderVisibility: !this.state
                                        .uploaderVisibility
                                })
                            }
                        />
                    }
                />
            </React.Fragment>
        );
    }
}
