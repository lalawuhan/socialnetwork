const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./utils/db");
const { hash, compare } = require("./utils/bcrypt");
const cookieSession = require("cookie-session");
const csurf = require("csurf");

app.use(compression());

app.use(express.static("public")); //url encoded always has to come first before csurf

app.use(express.json()); //body parser

app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 6
    })
);

app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

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

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    db.loginUser(email).then(result => {
        compare(password, result.rows[0].password)
            .then(matchValue => {
                if (matchValue) {
                    req.session.userId = result.rows[0].id;
                    res.json({ success: true });
                } else {
                    console.log("error in compare ");
                    res.json({ success: false });
                }
            })
            .catch(error => {
                console.log("error in hash login register ", error);
                res.json({ success: false });
            });
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

//lsof -i tcp:8080
//kill -9
