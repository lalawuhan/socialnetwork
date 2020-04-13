import React from "react";
import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";
import { Title, ProfileWrapper } from "./standardStyles.js";

export default function Profile({ image_url, bioText, setBio }) {
    return (
        <>
            <ProfileWrapper>
                <div>
                    <ProfilePic image_url={image_url} />
                </div>
                <BioEditor bioText={bioText} setBio={setBio} />
            </ProfileWrapper>
        </>
    );
}
