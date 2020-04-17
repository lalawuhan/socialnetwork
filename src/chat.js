import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import {
    StyledChatArea,
    StyledTextInput,
    UserImage,
} from "./standardStyles.js";

export default function Chat() {
    const elemRef = useRef();

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
                    <div>
                        {chatMessages &&
                            chatMessages.map((msg, msg_id) => {
                                return (
                                    <UserImage key={msg_id}>
                                        <img
                                            src={
                                                msg.image_url
                                                    ? msg.image_url
                                                    : "/images/default.png"
                                            }
                                        />
                                        <div>
                                            <b>
                                                {msg.first} {msg.last}
                                            </b>
                                            <br></br>
                                            <span>
                                                {msg.message} posted at:{" "}
                                                {msg.time_posted}
                                            </span>
                                        </div>
                                    </UserImage>
                                );
                            })}
                    </div>
                </StyledChatArea>
                <div id="textarea">
                    <StyledTextInput
                        className="textarea"
                        placeholder="Add your message here"
                        onKeyDown={keyCheck}
                        size="2em"
                    ></StyledTextInput>
                </div>
            </div>
        </div>
    );
}
