import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import {
    SearchColumn,
    NewUsers,
    ErrorText,
    Input,
} from "./styles/standardStyles";

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
            <SearchColumn>
                {searchTerm == null && <p>Find your friends</p>}

                <Input
                    id="search-users"
                    type="text"
                    placeholder="Type to search for users..."
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
            </SearchColumn>

            {error && (
                <ErrorText>Something went wrong. Please try again.</ErrorText>
            )}

            <NewUsers>
                {newestUsers.map((user) => (
                    <div key={user.id}>
                        <Link to={"/user/" + user.id} className="find-links">
                            <h3>
                                {user.first} {user.last}
                            </h3>
                            <img
                                src={user.image_url || "/images/default.png"}
                            />
                        </Link>
                    </div>
                ))}
            </NewUsers>
        </div>
    );
}
