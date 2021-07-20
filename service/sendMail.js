const AWS = require("aws-sdk");
const config = require('../env/enviornment_variables');
const tempProcessor = require('./templateConfigDriver/templateProcessor')
const TemplateConfigurationDetails = require('../env/templateConfigurations');

exports.MailMerge_AWS_SES = (req, res, next) => {

    let params = null;
    let ses = null;
    let sendEmail = null;

    AWS.config.update({
        region: config.aws_SES_Credentials.region
    });

    ses = new AWS.SES({
        apiVersion: "2010-12-01"
    });

    params = tempProcessor.templateParamDefination(req.body, TemplateConfigurationDetails[req.body.templateId]);

    //SEND MAIL TRIGGER SEGMENT
    sendEmail = ses.sendEmail(params).promise();

    return sendEmail.then((data) => {
            return {
                status: 200,
                data: data.MessageId,
                message: "Email sent successfully"
            };
        })
        .catch((err) => {
            return {
                status: 500,
                data: data.MessageId,
                message: "Email unsuccessfully sent"
            };
        });
}