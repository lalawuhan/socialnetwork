import React, { useState } from "react";
import axios from "./axios";

export default function BioEditor(props) {
    const [data, setData] = useState({
        ...props,
        bioEditorVisibility: false,
    });

    const handleSubmit = (event) => {
        event.preventDefault();
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

    if (data.bioEditorVisibility == false) {
        //if the user doesn't have a bio
        if (props.bioText == null || props.bioText == "") {
            return (
                <div>
                    <button
                        onClick={() =>
                            setData({
                                bioEditorVisibility: true,
                            })
                        }
                    >
                        Create a bio
                    </button>
                </div>
            );
        } else {
            //already have bio?
            return (
                <div>
                    {props.bioText}
                    <button
                        onClick={() =>
                            setData({
                                bioEditorVisibility: true,
                                bioText: props.bioText,
                            })
                        }
                    >
                        Edit Bio
                    </button>
                </div>
            );
        }
    } else {
        return (
            <form>
                <textarea
                    id="inputText"
                    name="inputText"
                    value={data.bioText}
                    onChange={() => setData({ bioText: event.target.value })}
                ></textarea>
                <button
                    type="submit"
                    value={data.bioText}
                    onClick={handleSubmit}
                >
                    Update
                </button>
            </form>
        );
    }
}
