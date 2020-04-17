import React from "react";
import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";
import { ProfileWrapper } from "./standardStyles.js";
import DeleteAccount from "./deleteaccount";

export default function Profile({ image_url, bioText, setBio, toggleModal }) {
    return (
        <>
            <ProfileWrapper>
                <div onClick={toggleModal}>
                    <ProfilePic image_url={image_url} />
                </div>
                <BioEditor bioText={bioText} setBio={setBio} />
            </ProfileWrapper>
            <DeleteAccount image_url={image_url} />
        </>
    );
}
