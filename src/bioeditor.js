import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bioEditorVisibility: false,
        };
    }
    handleChange(event) {
        this.setState({ title: event.target.value });
    }

    submit() {
        var self = this;
        var addBio = document.getElementById("inputtext").value;
        var bioData = { addBio: addBio };
        //console.log("what does addbio give", bioData);
        axios
            .post("/bio", bioData)
            .then((res) => {
                //console.log("res from /post bio", res.data.biography);
                self.setState({
                    bioEditorVisibility: false,
                    addBio: res.data.biography,
                });
                //console.log("selfie", self);
                self.props.setBio(res.data.biography);
            })
            .catch((error) => {
                console.log("error in posting bio, /post", error);
            });
    }

    render() {
        if (this.state.bioEditorVisibility == false) {
            //if the user doesn't have a bio
            if (this.props.addBio == null) {
                return (
                    <div>
                        <button
                            onClick={() =>
                                this.setState({
                                    bioEditorVisibility: true,
                                })
                            }
                        >
                            Create a bio
                        </button>
                    </div>
                );
            } else {
                //already have bio?
                return (
                    <div>
                        {this.props.addBio}
                        <button
                            onClick={() =>
                                this.setState({
                                    bioEditorVisibility: true,
                                })
                            }
                        >
                            Edit Bio
                        </button>
                    </div>
                );
            }
        } else {
            return (
                <>
                    <textarea
                        id="inputtext"
                        name="bio"
                        value={this.state.bio}
                        onChange={this.handleChange.bind(this)}
                    ></textarea>
                    <button onClick={() => this.submit()}>Update</button>
                </>
            );
        }
    }
}
