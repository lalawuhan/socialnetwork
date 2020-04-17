import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getFriendsAndRequesters,
    acceptFriendRequest,
    endFriendship,
} from "./actions/actions";
import { Link } from "react-router-dom";
import { UserImage } from "./standardStyles";
import { Button } from "./standardStyles.js";

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
                <h3>Friends</h3>
                <>
                    {friends &&
                        friends.map((user) => {
                            return (
                                <div>
                                    <div key={user.id}>
                                        <Link to={`/user/${user.id}`}>
                                            <UserImage>
                                                <img src={user.image_url} />
                                                {user.first} {user.last}
                                            </UserImage>
                                        </Link>
                                        <Button
                                            primary
                                            onClick={() =>
                                                dispatch(endFriendship(user.id))
                                            }
                                        >
                                            Unfriend
                                        </Button>
                                    </div>
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
                                    <Button
                                        primary
                                        onClick={() =>
                                            dispatch(
                                                acceptFriendRequest(user.id)
                                            )
                                        }
                                    >
                                        Accept Friend Request
                                    </Button>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
