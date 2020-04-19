import React, { useEffect, useRef, useState } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import {
    StyledChatArea,
    StyledTextInput,
    UserImage,
    UserImageHolder,
} from "./styles/standardStyles.js";

export default function Chat() {
    const elemRef = useRef();
    let max_chars = 30;
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
            <span>
                <div>Chat Box</div>
            </span>

            <div>
                <StyledChatArea ref={elemRef}>
                    {chatMessages &&
                        chatMessages.map((msg, msg_id) => {
                            return (
                                <UserImage key={msg_id}>
                                    <UserImageHolder>
                                        <img
                                            className="avatar"
                                            src={
                                                msg.image_url
                                                    ? msg.image_url
                                                    : "/images/default.png"
                                            }
                                        />
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
                <div id="textarea">
                    <StyledTextInput
                        className="textarea"
                        type="text"
                        placeholder="Add your message here"
                        onKeyDown={keyCheck}
                        onChange={handleChange}
                        size="2em"
                        maxLength="30"
                    ></StyledTextInput>
                    <span>Characters Left: {state.chars_left}</span>
                </div>
            </div>
        </div>
    );
}
