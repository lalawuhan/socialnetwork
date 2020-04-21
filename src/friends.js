import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getFriendsAndRequesters,
    acceptFriendRequest,
    endFriendship,
} from "./actions/actions";
import { Link } from "react-router-dom";
import { UserImage, NewUsers } from "./styles/standardStyles";
import { Button } from "./styles/standardStyles.js";

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
                <NewUsers>
                    {friends &&
                        friends.map((user) => {
                            return (
                                <div key={user.id}>
                                    <div>
                                        <Link to={`/user/${user.id}`}>
                                            {user.first} {user.last}
                                            <img src={user.image_url} />
                                        </Link>
                                        <Button
                                            friend
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
                </NewUsers>
            </div>
            <div>
                <p>Friend Requests </p>
                <NewUsers>
                    {requesters &&
                        requesters.map((user) => {
                            return (
                                <div key={user.id}>
                                    <Link to={`/user/${user.id}`}>
                                        {user.first} {user.last}
                                        <img src={user.image_url} />
                                    </Link>
                                    <Button
                                        friend
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
                </NewUsers>
            </div>
        </div>
    );
}
