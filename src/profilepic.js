import React from "react";

export default function ProfilePic(props) {
    let image_url = props.image_url;
    //console.log("imageurl profilepic", image_url);
    image_url = image_url || "/images/default.png";
    return (
        <>
            <img
                src={props.image_url}
                alt="user profile photo"
                onClick={props.toggleModal}
            />
        </>
    );
}
