import React, { useState, useEffect } from "react";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Profile from "./profile";
import OtherProfile from "./otherprofile";
import FindPeople from "./findpeople";
import Friends from "./friends";
import {
    Navbar,
    StyledHeadlinePrimary,
    UploaderWrap,
    UpperNav,
} from "./standardStyles.js";
import { Link } from "react-router-dom";
import DarkModeToggle from "./darkmodetoggle";
import Chat from "./chat";

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
                <UpperNav>
                    <DarkModeToggle />
                    <Link to="/users">Find People</Link>
                    <Link to="/friends">Friends</Link>
                    <Link to="/chat">Chat</Link>
                </UpperNav>
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
                    <div>
                        <StyledHeadlinePrimary>
                            {data.first} {data.last}
                        </StyledHeadlinePrimary>
                        <p>{data.biography}</p>
                    </div>
                </Navbar>
                <UploaderWrap>
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
                </UploaderWrap>
                <Route
                    exact
                    path="/"
                    render={() => (
                        <Profile
                            first={data.first}
                            last={data.last}
                            image_url={data.image_url}
                            bioText={data.biography}
                            setBio={(bioText) =>
                                setData({
                                    ...data,
                                    biography: bioText,
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
                <Route path="/friends" component={Friends} />
                <Route path="/chat" component={Chat} />
            </BrowserRouter>
        </React.Fragment>
    );
}
