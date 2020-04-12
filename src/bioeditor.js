import React, { useState } from "react";
import axios from "./axios";

export default function BioEditor(props) {
    const [data, setData] = useState({
        ...props,
        bioEditorVisibility: false,
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        let addBio = event.target.value;
        console.log("addBio", addBio);
        axios
            .post("/bio", { addBio })
            .then((res) => {
                console.log("res from /post bio", res.data);
                setData({
                    bioEditorVisibility: false,
                    addBio: res.data.biography,
                });
                props.setBio(res.data.biography);
            })
            .catch((error) => {
                console.log("error in posting bio, /post", error);
            });
    };

    if (data.bioEditorVisibility == false) {
        console.log("checking bio status is happening");
        console.log("data in check", props);
        //if the user doesn't have a bio
        if (props.addBio == null || props.addBio == "") {
            return (
                <div>
                    <button
                        onClick={() =>
                            setData({
                                bioEditorVisibility: true,
                                addBio: props.addBio,
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
                    {props.addBio}
                    <button
                        onClick={() =>
                            setData({
                                bioEditorVisibility: true,
                                addBio: props.addBio,
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
                    value={data.addBio}
                    onChange={() => setData({ addBio: event.target.value })}
                ></textarea>
                <button
                    type="submit"
                    value={data.addBio}
                    onClick={handleSubmit}
                >
                    Update
                </button>
            </form>
        );
    }
}
