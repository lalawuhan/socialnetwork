import React, { useEffect, useRef, useState } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import {
    StyledChatArea,
    StyledTextInput,
    UserImage,
    UserImageHolder,
    TextInputChild,
} from "./styles/standardStyles.js";
import { Link } from "react-router-dom";

export default function Chat() {
    const elemRef = useRef();
    let max_chars = 45;
    const [state, setState] = useState({ chars_left: max_chars });

    const handleChange = (event) => {
        var input = event.target.value;
        setState({
            chars_left: max_chars - input.length,
        });
    };

    const chatMessages = useSelector((state) => state && state.messages);
    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [chatMessages]);

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit("chatMessage", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <div>
            <div>
                <StyledChatArea ref={elemRef}>
                    {chatMessages &&
                        chatMessages.map((msg, msg_id) => {
                            console.log("msg", msg);
                            return (
                                <UserImage key={msg_id}>
                                    <UserImageHolder>
                                        <Link to={"/user/" + msg.sender_id}>
                                            <img
                                                className="avatar"
                                                src={
                                                    msg.image_url
                                                        ? msg.image_url
                                                        : "/images/default.png"
                                                }
                                            />
                                        </Link>
                                        <div>
                                            <div className="message-avatar">
                                                <span className="message">
                                                    {msg.message}{" "}
                                                </span>
                                                <span className="avatar-name">
                                                    {msg.first} {msg.last}
                                                </span>
                                            </div>
                                            <span className="timeposted">
                                                {msg.time_posted}
                                            </span>
                                        </div>
                                    </UserImageHolder>
                                </UserImage>
                            );
                        })}
                </StyledChatArea>
                <TextInputChild id="textarea">
                    <StyledTextInput
                        className="textarea"
                        type="text"
                        placeholder="Add your message here"
                        onKeyDown={keyCheck}
                        onChange={handleChange}
                        size="2em"
                        maxLength="45"
                    ></StyledTextInput>
                    <span>Characters Left: {state.chars_left}</span>
                </TextInputChild>
            </div>
        </div>
    );
}
