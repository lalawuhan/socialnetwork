Vast void social network is the last project from my bootcamp. 
![Gif](https://github.com/lalawuhan/socialnetwork/blob/master/public/images/demo.gif?raw=true)

#### Built with
 PostgreSQL, AWS (S3), Styled Components, React, Redux, Node.js (Express), Moment.js, Socket.io, Multer Image Upload

#### Features
* Login and Registration : Passwords are hashed using the bcrypt library. Forms include CSRF protection 
* Password recovery via email
* Image upload, biography editing 
* Search capabilities, friendship requests, accepting requests, ending friendships, 
* Dynamic rendering of current friendships, pending requests
* Chat room : The user can chat with everyone that is online

This project served as a way to learn React, and utilizes both class and functional components, and Redux in parts of it. Ideally I would use functional components in the entire project.

#### Quick Installation
Quick Installation will have limited features(no image upload), if you follow the full installation below, you should be able to use all features
`cd socialnetwork`
* Start the server in one terminal tab
`node bundle-server.js`
* Run the front end in terminal tab
`npm start`
* Viw the app on port 8080

### Installation
* ` git clone https://github.com/lalawuhan/socialnetwork.git`
* ` cd socialnetwork`
* ` npm install`
* `cd config && touch secrets.json`

Paste in the following code inside secrets.json and configure it accordingly

```js 
{
    "psqlConfig": "postgres:postgres:postgres@localhost:5432/socialnetwork",
    "sessionSecret": "this is a secret!!",
    "bcryptSalt": "this is a secret!!",
    "AWS_KEY": "XXXXXXX",
    "AWS_SECRET": "XXXXXXX/XXXXXXX/",
    "AWS_BUCKET": "socialnetwork",
    "s3Url": "https://s3.amazonaws.com/XXXXXXX/"
}
```

Demo
--- 

| Registration                                                                                                  |                                               Chat                                                |                                                                                                    Search |
| ------------------------------------------------------------------------------------------------------------- | :-----------------------------------------------------------------------------------------------: | --------------------------------------------------------------------------------------------------------: |
| ![Logged In View](https://github.com/lalawuhan/socialnetwork/blob/master/public/images/loggedin.png?raw=true) | ![Chat](https://github.com/lalawuhan/socialnetwork/blob/master/public/images/socket.png?raw=true) | ![search](https://github.com/lalawuhan/socialnetwork/blob/master/public/images/friendsearch.png?raw=true) |

### Attributions

* [Dark Mode Feature](https://github.com/donavon/use-dark-mode)
* [Demo user](https://thispersondoesnotexist.com/) is not a real person
  