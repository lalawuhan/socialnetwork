import React from "react";
import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";
import { ProfileWrapper } from "./styles/standardStyles.js";

export default function Profile({ image_url, bioText, setBio, toggleModal }) {
    return (
        <>
            <ProfileWrapper>
                <div onClick={toggleModal}>
                    <ProfilePic image_url={image_url} />
                </div>
                <BioEditor bioText={bioText} setBio={setBio} />
            </ProfileWrapper>
        </>
    );
}
