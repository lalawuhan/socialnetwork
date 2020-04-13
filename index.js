const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./utils/db");
const { hash, compare } = require("./utils/bcrypt");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const ses = require("./utils/ses");
const cryptoRandomString = require("crypto-random-string");
const config = require("./config");
const s3 = require("./s3");

// FILE UPLOAD BOILERPLATE //
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

//////////////

app.use(compression());

app.use(express.static("public")); //url encoded always has to come first before csurf

app.use(express.json()); //body parser

app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 6,
    })
);

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
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

app.get("/user", function (req, res) {
    db.getUserData(req.session.userId).then((results) => {
        res.json({
            id: results.rows[0].id,
            first: results.rows[0].first,
            last: results.rows[0].last,
            image_url: results.rows[0].image_url,
            biography: results.rows[0].biography,
        });
    });
});

//register

app.post("/register", (req, res) => {
    console.log("post /register body", req.body);
    const { first, last, email, password } = req.body;
    hash(password)
        .then((hashedPw) => {
            db.addUser(first, last, email, hashedPw)
                .then((response) => {
                    req.session.userId = response.rows[0].id;
                    req.session.first = response.rows[0].first;
                    req.session.last = response.rows[0].last;
                    req.session.email = response.rows[0].email;
                    req.session.image_url = response.rows[0].image_url;
                    req.session.biography = response.rows[0].biography;
                    res.json({ success: true });
                })
                .catch((error) => {
                    console.log("error in hash password register ", error);
                    res.json({ success: false });
                });
        })
        .catch((error) => {
            console.log("error in Post register ", error);
        });
});

//async await
/* 
app.post("/register", async (req, res) => {
    const { first, last, email, password } = req.body;
    try {
        let hashedPw = await hash(password); //do this first
        let id = await db.addUser(first, last, email, hashedPw); //then run db insert, then only do things after
        req.session.userId = id;
        res.json({ success: true });
    } catch (error) {
        console.log("error in POST/registration", error);
    }
}); */

//login

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    db.getUser(email).then((result) => {
        compare(password, result.rows[0].password)
            .then((matchValue) => {
                if (matchValue) {
                    req.session.userId = result.rows[0].id;
                    res.json({ success: true });
                } else {
                    console.log("error in compare passwords ");
                    res.json({ success: false });
                }
            })
            .catch((error) => {
                console.log("error in hash login register ", error);
                res.json({ success: false });
            });
    });
});

//forgot password
//1 : POST /password/reset/start
app.post("/password/reset/start", (req, res) => {
    //const email = req.body.email;
    const secretCode = cryptoRandomString({
        length: 6,
    });
    console.log("post request to /reset happened");
    db.getUser(req.body.email).then((result) => {
        console.log("user exists, result rows :", result.rows[0]);
        if (result.rows[0] != undefined) {
            //generate secret code
            console.log("secret code is", secretCode);
            db.generateResetCode(req.body.email, secretCode);
            ses.sendEmail(
                "users-email@gmail.com",
                "Your reset code",
                "a super secret code " + secretCode
            );
            res.json({ success: true });
        } else {
            console.log(" error in (getUser index.js)");
        }
    });
});

//2: POST /password/reset/verify
app.post("/password/reset/verify", (req, res) => {
    console.log("reset verify body", req.body);
    //const { email, password } = req.body;
    db.verifySecretCode(req.body.email)
        .then((result) => {
            console.log("result from verify ", result.rows);
            if (result.rows != undefined) {
                hash(req.body.password)
                    .then((hashedPw) => {
                        db.updatePassword(req.body.email, hashedPw)
                            .then(res.json({ success: true }))
                            .catch((error) => {
                                console.log(
                                    "error in updating password /verify ",
                                    error
                                );
                                res.json({ success: false });
                            });
                    })
                    .catch((error) => {
                        console.log("error in post /verify", error);
                        res.json({ success: false });
                    });
            } else {
                console.log("did not verify code  in /password/reset/verify");
                res.json({ success: false });
            }
        })
        .catch((error) => {
            console.log("error on whole reset/ db bverify secret code", error);
            res.json({ success: false });
        });
});

//Upload image
app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    console.log("req file, upload", req.file);
    if (req.file) {
        let image_url = config.s3Url + req.file.filename;
        db.addProfilePic(image_url, req.session.userId)
            .then((image) => {
                //console.log("image jsom", image);
                res.json(image);
            })
            .catch((error) => {
                console.log("error in upload profile pic, index.js", error);
            });
    } else {
        res.sendStatus(500);
        res.json({
            success: false,
        });
    }
});
//add biography
app.post("/bio", (req, res) => {
    // console.log("index.js /post bio", req.body);
    db.updateBiography(req.body.bioText, req.session.userId).then((results) => {
        //console.log("index.js results from /post bio: ", results.rows);
        res.json({
            biography: results.rows[0].biography,
        });
    });
});

//get user by id
app.get("/user/:id.json", (req, res) => {
    db.getUserById(req.params.id).then(({ rows }) => {
        res.json({
            id: rows[0].id,
            first: rows[0].first,
            last: rows[0].last,
            image_url: rows[0].image_url,
            biography: rows[0].biography,
        });
    });
});

//get latest users
app.get("/newestUsers", (req, res) => {
    db.getNewestUsers()
        .then((results) => {
            //console.log("newwest peeps", results.rows);
            res.json(results.rows);
        })
        .catch((error) => {
            console.log("index.js /users db.getNewestUsers error: ", error);
        });
});

app.get("/searchUsers/", (req, res) => {
    const q = req.query.q;
    //console.log("query for searching users, index.js:", q);
    db.getMatchingUsers(q)
        .then((results) => {
            //console.log("search results:", results);
            res.json(results.rows);
        })
        .catch((error) => {
            console.log("index.js searched for user fail: ", error);
        });
});

// friendship routes
app.get("/initial-friendship-status/:id", (req, res) => {
    db.CheckInitialFriendshipStatus(req.session.userId, req.params.id).then(
        (results) => {
            res.json(results.rows[0]);
        }
    );
});

app.post("/make-friend-request/:id", (req, res) => {
    db.makeFriendRequest(req.session.userId, req.params.id).then((results) => {
        res.json(results.rows[0]);
    });
});

app.post("/accept-friend-request/:id", (req, res) => {
    db.acceptFriendRequest(req.session.userId, req.params.id).then(() => {
        res.json({
            success: true,
        });
    });
});

app.post("/end-friendship/:id", (req, res) => {
    db.endFriendship(req.session.userId, req.params.id).then(() => {
        res.json({
            success: true,
        });
    });
});

//this route needs to be the last route
app.get("*", (req, res) => {
    if (req.session.userId) {
        //console.log("I am now here /");
        res.sendFile(__dirname + "/index.html");
    } else {
        res.redirect("/welcome");
    }
});

app.listen(8080, function () {
    console.log("I'm listening.");
});

//lsof -i tcp:8080
//kill -9
//global.catsup@spicedling.email
