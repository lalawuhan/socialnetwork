import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        console.log("uploader mountd");
    }
    handleChange(e) {
        this.setState({
            file: e.target.files[0]
        });
    }
    uploadImage() {
        console.log("I am uploading image now");
        var formData = new FormData();
        var self = this;
        formData.append("file", this.state.file);
        axios
            .post("/upload", formData)
            .then(function(response) {
                console.log(
                    "uploaded image response:",
                    response.data.rows[0].image_url
                );
                self.props.changeImageUrl(response.data.rows[0].image_url); //this.props.muffin("pass an argument back like url")
            })
            .catch(function(error) {
                console.log("error in POST /upload uploader.js", error);
            });
    }
    render() {
        return (
            <>
                <h3>Upload New Profile Photo</h3>
                <input
                    type="file"
                    name="file"
                    id="file"
                    onChange={e => this.handleChange(e)}
                />
                <button onClick={() => this.uploadImage()}>
                    Submit image{" "}
                </button>
            </>
        );
    }
}
