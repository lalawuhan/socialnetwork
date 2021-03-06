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
    AvatarDiv,
    MenuButton,
    UpperNav,
    RoundedAvatar,
    DivRow,
} from "./styles/standardStyles.js";
import { GlobalStyle } from "./styles/globalStyle";
import Chat from "./chat";
import DeleteAccount from "./deleteaccount";

import { useSpring } from "react-spring";
import { MenuRight } from "./Menu";
import DarkModeToggle from "./darkmodetoggle";

export default function App() {
    const [data, setData] = useState({});

    const [rightMenuVisible, setRightMenuVisible] = useState(false);
    const rightMenuAnimation = useSpring({
        opacity: rightMenuVisible ? 1 : 0,
        transform: rightMenuVisible ? `translateX(0)` : `translateX(100%)`,
    });
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
            <GlobalStyle />

            <BrowserRouter>
                <UpperNav>
                    <DarkModeToggle />

                    <MenuButton
                        className="menu-button"
                        onClick={() => setRightMenuVisible(!rightMenuVisible)}
                    >
                        {rightMenuVisible ? "Close" : "Menu"}
                    </MenuButton>
                    <MenuRight style={rightMenuAnimation} />
                </UpperNav>
                <AvatarDiv>
                    <DivRow className="avatar-row-top"></DivRow>
                    <RoundedAvatar>
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
                    </RoundedAvatar>
                    <DivRow className="avatar-row-bottom">
                        <h1>
                            {data.first} {data.last}
                        </h1>
                        <p>{data.biography}</p>
                    </DivRow>
                </AvatarDiv>

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
                        <div>
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
                                toggleModal={() =>
                                    setData({
                                        ...data,
                                        uploaderVisibility: !data.uploaderVisibility,
                                    })
                                }
                            />
                        </div>
                    )}
                />
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
                <DeleteAccount image_url={data.image_url} />
            </BrowserRouter>
        </React.Fragment>
    );
}
