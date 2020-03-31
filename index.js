const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./utils/db");
const { hash, compare } = require("./utils/bcrypt");
const cookieSession = require("cookie-session");

app.use(compression());

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(express.static("public")); //url encoded always has to come first before csurf
app.use(express.json());

app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 6
    })
);

app.get("/welcome", (req, res) => {
    if (!req.session.userId) {
        res.sendFile(__dirname + "/index.html");
    } else {
        res.redirect("/");
    }
});

app.post("/register", (req, res) => {
    console.log("post /register body", req.body);
    const { first, last, email, password } = req.body;
    hash(password)
        .then(hashedPw => {
            db.addUser(first, last, email, hashedPw)
                .then(response => {
                    req.session.userId = response.rows[0].id;
                    req.session.first = response.rows[0].first;
                    req.session.last = response.rows[0].last;
                    req.session.email = response.rows[0].email;
                    req.session.image_url = response.rows[0].image_url;
                    req.session.biography = response.rows[0].biography;
                    res.json({ success: true });
                })
                .catch(error => {
                    console.log("error in hash password register ", error);
                    res.json({ success: false });
                });
        })
        .catch(error => {
            console.log("error in Post register ", error);
        });
});

//this route needs to be the last route
app.get("*", (req, res) => {
    if (req.session.userId) {
        console.log("I am now here /");

        res.sendFile(__dirname + "/index.html");
    } else {
        res.redirect("/welcome");
    }
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
