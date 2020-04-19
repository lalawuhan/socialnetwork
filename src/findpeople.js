import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { UserHolder, UserImage, ErrorText, Input } from "./standardStyles";

export default function FindPeople() {
    const [newestUsers, setNewestUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState();
    const [error, setError] = useState(false);
    const [users, setUsers] = useState([]);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        axios
            .get("/newestUsers")
            .then(({ data }) => {
                setNewestUsers(data);
            })
            .catch((error) => {
                console.log("findpeople,js GET newestusers error ", error);
                setError(true);
            });
    }, []);

    useEffect(() => {
        if (!searchTerm) {
            return;
        }
        axios
            .get("/searchUsers/?q=" + searchTerm)
            .then(({ data }) => {
                setNewestUsers(data);
                setUsers(data);
            })
            .catch((error) => {
                console.log(
                    "findpeople.js catch error in search results",
                    error
                );
                setError(true);
            });
    }, [searchTerm]);

    return (
        <div>
            <>
                {searchTerm == null && <p>Find your friends</p>}

                <Input
                    id="search-users"
                    type="text"
                    placeholder="Search"
                    onChange={handleChange}
                />

                {(users.length < 1 && (
                    <h2>
                        {searchTerm
                            ? `No Results for ${searchTerm}`
                            : "Please Enter Username"}
                    </h2>
                )) || (
                    <p>
                        Searching for <strong>{searchTerm}</strong>
                    </p>
                )}
            </>

            {error && (
                <ErrorText>Something went wrong. Please try again.</ErrorText>
            )}

            <UserHolder>
                {newestUsers.map((user) => (
                    <UserImage className="user-search-link" key={user.id}>
                        <Link to={"/user/" + user.id}>
                            <h3>
                                {user.first} {user.last}
                            </h3>
                            <div>
                                <img
                                    src={
                                        user.image_url || "/images/default.png"
                                    }
                                />
                            </div>
                        </Link>
                    </UserImage>
                ))}
            </UserHolder>
        </div>
    );
}
