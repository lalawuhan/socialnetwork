import React from "react";
import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";
import { ProfileDesign } from "./styles/standardStyles";

export default function Profile({ image_url, bioText, setBio, toggleModal }) {
    return (
        <>
            <div>
                <ProfileDesign onClick={toggleModal}>
                    <ProfilePic image_url={image_url} />
                </ProfileDesign>
                <BioEditor bioText={bioText} setBio={setBio} />
            </div>
        </>
    );
}
