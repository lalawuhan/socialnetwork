import React, { useState } from "react";
import axios from "./axios";
import Modal from "react-modal";
import { Button } from "./styles/standardStyles.js";

export default function Uploader(props) {
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const [data, setData] = useState({});

    const handleChange = (e) => {
        setData({
            file: e.target.files[0],
        });
    };
    Modal.setAppElement("#main");

    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "2em",
            background: "#303030",
            color: "white",
            width: "25em",
        },
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        var formData = new FormData();
        formData.append("file", data.file);
        axios
            .post("/upload", formData)
            .then(function (response) {
                console.log(
                    "uploaded image response:",
                    response.data.rows[0].image_url
                );
                props.changeImageUrl(response.data.rows[0].image_url);
            })
            .catch(function (error) {
                console.log("error in POST /upload uploader.js", error);
            });
    };
    return (
        <div>
            <div>
                <Button onClick={openModal}>Upload Photo</Button>
                <Modal
                    style={customStyles}
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Delete Account Modal"
                    closeTimeoutMS={1000}
                >
                    <h3>Upload Profile Photo</h3>
                    <input
                        type="file"
                        name="file"
                        id="file"
                        onChange={handleChange}
                    />
                    <br />
                    <Button onClick={closeModal}>Cancel</Button>
                    <Button success onClick={handleSubmit}>
                        Submit image{" "}
                    </Button>
                </Modal>
            </div>
        </div>
    );
}
