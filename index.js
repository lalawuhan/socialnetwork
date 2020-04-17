const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });
const compression = require("compression");
const db = require("./utils/db");
const { hash, compare } = require("./utils/bcrypt");
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

const cookieSession = require("cookie-session");
const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90,
});

app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});
3;

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
app.post("/password/reset/start", (req, res) => {
    const secretCode = cryptoRandomString({
        length: 6,
    });
    db.getUser(req.body.email).then((result) => {
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
    if (req.file) {
        let image_url = config.s3Url + req.file.filename;
        db.addProfilePic(image_url, req.session.userId)
            .then((image) => {
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
    db.updateBiography(req.body.bioText, req.session.userId).then((results) => {
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
            res.json(results.rows);
        })
        .catch((error) => {
            console.log("index.js /users db.getNewestUsers error: ", error);
        });
});

app.get("/searchUsers/", (req, res) => {
    const q = req.query.q;
    db.getMatchingUsers(q)
        .then((results) => {
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

app.get("/friends-requesters", (req, res) => {
    db.getFriendsAndRequesters(req.session.userId)
        .then((payload) => {
            res.json(payload.rows);
        })
        .catch((error) => {
            console.log("index.js friends requesters failed: ", error);
        });
});

app.post("/delete-account", (req, res) => {
    if (req.body.image_url !== null) {
        let filename = req.body.image_url.split("/").pop();
        s3.deleteObject(filename)
            .then((response) =>
                console.log("image successfully deleted: ", response)
            )
            .catch((err) => console.log("Error deleting image: ", err));
    }
    Promise.all([
        db.deleteChatData(req.session.userId),
        db.deleteFriendshipData(req.session.userId),
        db.deleteUserData(req.session.userId),
    ])
        .then(() => {
            req.session = null;
            res.json({ success: true });
        })
        .catch((error) => {
            console.log("error in delete account", error);
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

server.listen(8080, function () {
    console.log("I'm listening.");
});

io.on("connection", function (socket) {
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }

    const userId = socket.request.session.userId;
    db.getLastTenMessages()
        .then((data) => {
            let messageData = data.rows;
            io.sockets.emit("chatMessages", messageData.reverse());
        })
        .catch((err) => console.log(err));

    socket.on("chatMessage", (msg) => {
        db.addMessage(userId, msg)
            .then(() => {
                db.getLastTenMessages().then((newMessage) => {
                    let msgObj = {
                        first: newMessage.rows[0].first,
                        last: newMessage.rows[0].last,
                        image_url: newMessage.rows[0].image_url,
                        time_posted: newMessage.rows[0].time_posted,
                        message: msg,
                    };
                    io.sockets.emit("chatMessage", msgObj);
                });
            })
            .catch((error) => {
                console.log("error index.js io sendMessage", error);
            });
    });
});
