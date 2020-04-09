import React from "react";
import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";
import { Title, ProfileWrapper } from "./standardStyles.js";

export default function Profile({ first, last, image_url, addBio, setBio }) {
    return (
        <>
            <div>
                <Title>Welcome to social network</Title>
                <Title>
                    User: {first} {last}
                </Title>
            </div>
            <ProfileWrapper>
                <div>
                    <ProfilePic image_url={image_url} />
                </div>
                <BioEditor addBio={addBio} setBio={setBio} />
            </ProfileWrapper>
        </>
    );
}
