import React, { useState } from "react";
import axios from "./axios";
import { Button } from "./styles/standardStyles.js";

export default function BioEditor(props) {
    const [data, setData] = useState({
        ...props,
        bioEditorVisibility: false,
    });

    const handleSubmit = (event) => {
        let bioText = event.target.value;
        axios
            .post("/bio", { bioText })
            .then((res) => {
                setData({
                    bioEditorVisibility: false,
                    bioText: res.data.biography,
                });
                props.setBio(res.data.biography);
            })
            .catch((error) => {
                console.log("error in posting bio, /post", error);
            });
    };

    const onKeyPress = (event) => {
        if (event.which === 13 /* Enter */) {
            event.preventDefault();
            handleSubmit(event);
        }
    };

    if (data.bioEditorVisibility == false) {
        //if the user doesn't have a bio
        if (props.bioText == null || props.bioText == "") {
            return (
                <div>
                    <Button
                        onClick={() =>
                            setData({
                                bioEditorVisibility: true,
                            })
                        }
                    >
                        Create a bio
                    </Button>
                </div>
            );
        } else {
            //already have bio?
            return (
                <div>
                    {props.bioText}
                    <Button
                        onClick={() =>
                            setData({
                                bioEditorVisibility: true,
                                bioText: props.bioText,
                            })
                        }
                    >
                        Edit Bio
                    </Button>
                </div>
            );
        }
    } else {
        return (
            <form onKeyPress={onKeyPress}>
                <textarea
                    id="inputText"
                    name="inputText"
                    value={data.bioText}
                    onChange={(e) => {
                        e.preventDefault();
                        setData({ bioText: e.target.value });
                    }}
                />
                <Button
                    onClick={handleSubmit}
                    type="submit"
                    value={data.bioText}
                >
                    Update
                </Button>
            </form>
        );
    }
}
