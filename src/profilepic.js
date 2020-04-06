import React from "react";

export default function ProfilePic(props) {
    console.log("props from here", props);

    return (
        <>
            <img
                alt={`${props.first} ${props.last} profile photo`}
                onClick={props.toggleModal}
                className="profile-pic"
                src={props.image_url ? props.image_url : "/images/default.png"}
            />
        </>
    );
}
