import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendButton({ otherUserId }) {
    const [buttonText, setButtonText] = useState("Make Friend Request");
    useEffect(() => {
        axios
            .get("/initial-friendship-status/" + otherUserId)
            .then((result) => {
                if (result.data.length == 0 || undefined) {
                    console.log("No Friendship Established");
                    setButtonText("Make Friend Request");
                } else if (result.data.accepted == false) {
                    if (result.data.receiver_id == otherUserId) {
                        setButtonText("Cancel Friend Request");
                    } else if (result.data.sender_id == otherUserId) {
                        setButtonText("Accept Friend Request");
                    }
                } else {
                    setButtonText("Unfriend");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [buttonText]);

    const handleClick = () => {
        if (buttonText == "Make Friend Request") {
            axios
                .post("/make-friend-request/" + otherUserId)
                .then(() => {
                    setButtonText("Cancel Friend Request");
                })
                .catch((error) => {
                    console.log("makefriendrequest error", error);
                });
        } else if (buttonText == "Accept Friend Request") {
            axios
                .post("/accept-friend-request/" + otherUserId)
                .then((result) => {
                    if (result.data.success) {
                        setButtonText("Unfriend");
                    }
                })
                .catch((error) => {
                    console.log("error in Accept Friend Request", error);
                });
        } else if (
            buttonText == "Cancel Friend Request" ||
            buttonText == "Unfriend"
        ) {
            axios.post("/end-friendship/" + otherUserId).then((result) => {
                if (result.data.success) {
                    setButtonText("Make Friend Request");
                }
            });
        }
    };

    return (
        <div>
            <button onClick={handleClick}>{buttonText}</button>
        </div>
    );
}