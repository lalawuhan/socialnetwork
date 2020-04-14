import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getFriendsAndRequesters,
    acceptFriendRequest,
    endFriendship,
} from "./actions/actions";
import { Link } from "react-router-dom";

export default function Friends() {
    const dispatch = useDispatch();
    const friends = useSelector((state) => {
        return (
            state.payload &&
            state.payload.filter((user) => user.accepted === true)
        );
    });
    const requesters = useSelector((state) => {
        return (
            state.payload &&
            state.payload.filter((user) => user.accepted === false)
        );
    });
    useEffect(() => {
        dispatch(getFriendsAndRequesters());
    }, []);

    return (
        <div>
            <div>
                <p>Friends</p>
                <>
                    {friends &&
                        friends.map((user) => {
                            return (
                                <div key={user.id}>
                                    <Link to={`/user/${user.id}`}>
                                        <img src={user.image_url} />
                                        {user.first} {user.last}
                                    </Link>
                                    <button
                                        onClick={() =>
                                            dispatch(endFriendship(user.id))
                                        }
                                    >
                                        Unfriend
                                    </button>
                                </div>
                            );
                        })}
                </>
            </div>
            <div>
                <p>Friend Requests </p>
                <div>
                    {requesters &&
                        requesters.map((user) => {
                            return (
                                <div key={user.id}>
                                    <Link to={`/user/${user.id}`}>
                                        <img src={user.image_url} />
                                        {user.first} {user.last}
                                    </Link>
                                    <button
                                        onClick={() =>
                                            dispatch(
                                                acceptFriendRequest(user.id)
                                            )
                                        }
                                    >
                                        Accept Friend Request
                                    </button>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
