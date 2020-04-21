import React, { useState } from "react";
import axios from "./axios";
import Modal from "react-modal";
import { Button } from "./styles/standardStyles.js";

export default function DeleteAccount(props) {
    const [modalIsOpen, setIsOpen] = useState(false);
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
            background: "#121212",
            color: "white",
            width: "25em",
        },
    };

    const deleteAccount = () => {
        axios
            .post("/delete-account", { image_url: props.image_url })
            .then((response) => {
                if (response.data.success) {
                    location.replace("/welcome");
                } else {
                    console.log("Error in deleting account");
                }
            })
            .catch();
    };

    return (
        <div>
            <div>
                <Button onClick={openModal}>Delete Account</Button>
                <Modal
                    style={customStyles}
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Delete Account Modal"
                    closeTimeoutMS={1000}
                >
                    <h3>Are you sure you want to delete your account?</h3>
                    <br />
                    <p>
                        If you delete your account, you will permanently lose
                        your account, messages and profile photo.
                    </p>
                    <Button onClick={closeModal} primary>
                        Cancel
                    </Button>
                    <Button onClick={deleteAccount} danger>
                        Delete
                    </Button>
                </Modal>
            </div>
            {/* <button onClick={deleteAccount}>Delete</button> */}
        </div>
    );
}
