import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function FindPeople() {
    const [newestUsers, setNewestUsers] = useState([]); //initial users from list : array destructuring
    const [searchResults, setSearchResults] = useState();
    const handleChange = (e) => {
        setSearchResults(e.target.value);
    };

    useEffect(() => {
        axios
            .get("/newestUsers")
            .then(({ data }) => {
                //console.log("findpeople.js GET newestusers: ", data);
                setNewestUsers(data);
            })
            .catch((error) => {
                console.log("findpeople,js GET newestusers error ", error);
            });
    }, []);

    useEffect(() => {
        if (!searchResults) {
            return;
        }
        axios
            .get("/searchUsers/?q=" + searchResults)
            .then(({ data }) => {
                setNewestUsers(data);
            })
            .catch((error) => {
                console.log(
                    "findpeople.js catch error in search results",
                    error
                );
            });
    }, [searchResults]); //useEffect's dependency array

    return (
        <div>
            <>
                <input
                    id="search-users"
                    type="text"
                    placeholder="Search for a user"
                    onChange={handleChange}
                />
                {searchResults == undefined && <h2>New Users:</h2>}
            </>
            <p>
                You are searching for <strong>{searchResults}</strong>
            </p>

            <div>
                {newestUsers.map((user) => (
                    <div className="user-search-link" key={user.id}>
                        <Link to={"/user/" + user.id}>
                            <h3>
                                {user.first} {user.last}
                            </h3>
                            <img
                                src={user.image_url || "/images/default.png"}
                            />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
