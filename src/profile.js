import React from "react";
import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";
import { Title, ProfileWrapper } from "./standardStyles.js";

export default function Profile(props) {
    //console.log("this is the main profile component", props); //props should come from app.js
    return (
        <>
            <div>
                <Title>Happy Friday</Title>
                <Title>
                    User: {props.first} {props.last}
                </Title>
            </div>
            <ProfileWrapper>
                <div>
                    <ProfilePic image_url={props.image_url} />
                </div>
                <BioEditor addBio={props.addBio} setBio={props.setBio} />
            </ProfileWrapper>
        </>
    );
}
