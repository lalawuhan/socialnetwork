import React, { useState, useEffect } from "react";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Profile from "./profile";
import OtherProfile from "./otherProfile";
import FindPeople from "./findpeople";
import { Navbar } from "./standardStyles.js";

export default function App() {
    const [data, setData] = useState({});

    useEffect(() => {
        axios
            .get("/user")
            .then(function (response) {
                setData(response.data);
            })
            .catch(function (error) {
                console.log("error in get(/user) app.js", error);
            });
    }, []);

    return (
        <React.Fragment>
            <BrowserRouter>
                <Navbar className="navbar">
                    <ProfilePic
                        first={data.first}
                        last={data.last}
                        image_url={data.image_url}
                        toggleModal={() =>
                            setData({
                                ...data,
                                uploaderVisibility: !data.uploaderVisibility,
                            })
                        }
                    />
                    <h1>
                        {data.first} {data.last}
                    </h1>
                    <p>{data.biography}</p>
                </Navbar>
                {data.uploaderVisibility && (
                    <Uploader
                        changeImageUrl={(image_url) =>
                            setData({
                                ...data,
                                image_url: image_url,
                                uploaderVisibility: false,
                            })
                        }
                    />
                )}
                <Route
                    exact
                    path="/"
                    render={() => (
                        <Profile
                            first={data.first}
                            last={data.last}
                            image_url={data.image_url}
                            addBio={data.biography}
                            setBio={(addBio) =>
                                setData({
                                    ...data,
                                    biography: addBio,
                                })
                            }
                        />
                    )}
                />

                {/* force a new component to be rendered */}
                <Route
                    path="/user/:id"
                    render={(props) => (
                        <OtherProfile
                            key={props.match.url}
                            match={props.match}
                            history={props.history}
                        />
                    )}
                />
                <Route path="/users" component={FindPeople} />
            </BrowserRouter>
        </React.Fragment>
    );
}
