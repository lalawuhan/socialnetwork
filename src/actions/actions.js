import axios from "../axios";

// Redux action types
export const GET_FRIENDS_AND_REQUESTERS = "GET_FRIENDS_AND_REQUESTERS";
export const ACCEPT_FRIEND_REQUEST = "ACCEPT_FRIEND_REQUEST";
export const END_FRIENDSHIP = "END_FRIENDSHIP";
export const GET_MESSAGE = "GET_MESSAGE";
export const GET_MESSAGES = "GET_MESSAGES";

export function getFriendsAndRequesters() {
    return axios
        .get("/friends-requesters")
        .then(({ data }) => {
            return {
                type: "GET_FRIENDS_AND_REQUESTERS",
                payload: data,
            };
        })
        .catch((error) => {
            console.log("actions.js getfriendsrequesters error", error);
        });
}
export function acceptFriendRequest(id) {
    return axios
        .post("/accept-friend-request/" + id)
        .then(({ data }) => {
            if (data.success) {
                return {
                    type: "ACCEPT_FRIEND_REQUEST",
                    id,
                };
            }
        })
        .catch((err) => {
            console.log("actions.js acceptFriendRequest  err: ", err);
        });
}

export function endFriendship(id) {
    return axios
        .post("/end-friendship/" + id)
        .then(({ data }) => {
            if (data.success) {
                return {
                    type: "END_FRIENDSHIP",
                    id,
                };
            }
        })
        .catch((err) => {
            console.log("endFriendship err: ", err);
        });
}

export function chatMessages(msgs) {
    return {
        type: "GET_MESSAGES",
        messages: msgs,
    };
}

export function chatMessage(msg) {
    return {
        type: "GET_MESSAGE",
        message: msg,
    };
}
