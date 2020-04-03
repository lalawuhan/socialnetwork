import React from "react";
import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";

export default function Profile(props) {
    //console.log("this is the main profile component", props); //props should come from app.js
    return (
        <>
            <div>
                <h2>Profile Photo</h2>
                <h3>
                    User: {props.first} {props.last}
                </h3>
            </div>
            <div>
                <ProfilePic image_url={props.image_url} />
            </div>
            <div>
                <BioEditor addBio={props.addBio} setBio={props.setBio} />
            </div>
        </>
    );
}
