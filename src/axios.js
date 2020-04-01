import axios from "axios";

const instance = axios.create({
    xsrfCookieName: "mytoken",
    xsrfHeaderName: "csrf-token" // the csurf middleware automatically checks this header for the token
});

export default instance;
