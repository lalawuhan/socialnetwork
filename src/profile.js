import React from "react";
import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";
import { ProfileDesign, ProfBio } from "./styles/standardStyles";

export default function Profile({ image_url, bioText, setBio, toggleModal }) {
    return (
        <ProfBio>
            <ProfileDesign onClick={toggleModal}>
                <ProfilePic image_url={image_url} />
            </ProfileDesign>
            <BioEditor bioText={bioText} setBio={setBio} />
        </ProfBio>
    );
}
