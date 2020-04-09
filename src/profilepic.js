import React from "react";

export default function ProfilePic({ first, last, image_url, toggleModal }) {
    return (
        <>
            <img
                alt={`${first} ${last} profile photo`}
                onClick={toggleModal}
                className="profile-pic"
                src={image_url ? image_url : "/images/default.png"}
            />
        </>
    );
}
