const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env;
} else {
    secrets = require("./secrets");
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "eu-west-1"
});

exports.sendEmail = function(to, subject, message) {
    return ses
        .sendEmail({
            Source: "Thabi <global.catsup@spicedling.email>",
            Destination: {
                ToAddresses: ["global.catsup@spicedling.email"]
            },
            Message: {
                Body: {
                    Text: {
                        Data: message
                    }
                },
                Subject: {
                    Data: subject
                }
            }
        })
        .promise()
        .then(() => console.log("it worked!"))
        .catch(err => console.log(err));
};
