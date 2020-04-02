import React from "react";

export default function ProfilePic(props) {
    console.log("props in profilepic", props);
    let image_url = props.image_url;
    image_url = image_url || "/images/default.png";
    return (
        <>
            <h2>Profile Photo</h2>
            <h3>
                User: {props.first} {props.last}
            </h3>

            <img
                src={props.image_url}
                alt={props.first + "" + props.last}
                onClick={props.toggleModal}
            />
        </>
    );
}
