import React from "react";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Profile from "./profile";
import OtherProfile from "./otherProfile";
import { Navbar } from "./standardStyles.js";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        var self = this;
        axios
            .get("/user")
            .then(function (response) {
                self.setState(response.data);
                console.log("state from app", self.state);
            })
            .catch(function (error) {
                console.log("error in get(/user) app.js", error);
            });
    }
    toggleModal() {
        this.setState({
            uploaderVisibility: !this.state.uploaderVisibility,
        });
    }

    render() {
        return (
            <React.Fragment>
                <BrowserRouter>
                    <Navbar className="navbar">
                        <ProfilePic
                            first={this.state.first}
                            last={this.state.last}
                            image_url={this.state.image_url}
                            toggleModal={() => this.toggleModal()}
                        />
                        <h1>
                            {this.state.first} {this.state.last}
                        </h1>
                        <p>{this.state.biography}</p>
                    </Navbar>
                    {this.state.uploaderVisibility && (
                        <Uploader
                            changeImageUrl={(image_url) =>
                                this.setState({
                                    image_url: image_url,
                                    uploaderVisibility: false,
                                })
                            }
                        />
                    )}
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Profile
                                first={this.state.first}
                                last={this.state.last}
                                image_url={this.state.image_url}
                                addBio={this.state.biography}
                                setBio={(addBio) =>
                                    this.setState({
                                        biography: addBio,
                                    })
                                }
                            />
                        )}
                    />

                    {/* force a new component to be rendered */}
                    <Route
                        path="/user/:id"
                        render={(props) => (
                            <OtherProfile
                                key={props.match.url}
                                match={props.match}
                                history={props.history}
                            />
                        )}
                    />
                </BrowserRouter>
            </React.Fragment>
        );
    }
}
