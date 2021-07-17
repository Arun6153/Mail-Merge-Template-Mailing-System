const AWS = require("aws-sdk");
const config = require('../env/enviornment_variables');
const fs = require('fs');
const path = require('path')

//FETCHING TEMPLATE ONE
const htmlData = fs.readFileSync(__dirname +config.templatePath+'template_1.html', "UTF-8");

exports.MailMerge_AWS_SES = (req, res, next)=> {

    console.log(req.body);
    console.log(req.body.email)

    AWS.config.update({
        //accessKeyId: config.aws_SES_Credentials.accessKeyId,
        //secretAccessKey: config.aws_SES_Credentials.secretAccessKey,
        region: config.aws_SES_Credentials.region
    });

    const ses = new AWS.SES({
        apiVersion: "2010-12-01"
    });

    const params = {
        Destination: {
          CcAddresses: [],
          ToAddresses: [req.body.email]
        },
        Message: {
          Body: {
            Html: {
             Charset: "UTF-8",
             Data: htmlData
            },
            Text: {
             Charset: "UTF-8",
             Data: "Welcome"
            }
           },
           Subject: {
            Charset: 'UTF-8',
            Data: 'Testing'
           }
          },
        Source: config.aws_SES_Credentials.SenderEmailId,
        ReplyToAddresses: [],
      };

    //For Sender
    const params1 = {
        Destination: {
            ToAddresses: [config.aws_SES_Credentials.SenderEmailId] // Email address/addresses that you want to send your email
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: "<html><h2>Creslin Care</h2><h3>Name: " + "Arun Saini" + "</h3><h3>Email: " + req.body.email + "</h3><h3>Message: " + "No Message for now" + "</h3></html>"
                },
                Text: {
                    Charset: "UTF-8",
                    Data: "This is the feedback message from user"
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Feedback from " + "Arun Saini"
            }
        },
        Source: "Feedback from user" + config.aws_SES_Credentials.SenderEmailId
    };

    //RECEIVER SEGMENT
    const sendEmail = ses.sendEmail(params).promise();
    //const sendEmailSender = ses.sendEmail(params1).promise();

    sendEmail.then(
        function(data) {
          console.log(data.MessageId);
        }).catch(
          function(err) {
          console.error(err, err.stack);
    });
}