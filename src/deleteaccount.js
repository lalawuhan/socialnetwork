import React from "react";
import axios from "./axios";

export default function DeleteAccount(props) {
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
        <>
            <button onClick={deleteAccount}>Delete</button>
        </>
    );
}
