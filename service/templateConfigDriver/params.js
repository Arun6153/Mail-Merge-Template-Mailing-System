const config = require("../../env/enviornment_variables");

exports.SESParam = (resData, templateDetails, htmldata) => {
  return {
    Destination: {
      CcAddresses: [],
      ToAddresses: [resData.email],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: htmldata,
        },
        Text: {
          Charset: "UTF-8",
          Data: templateDetails.subject,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: templateDetails.subject,
      },
    },
    Source: config.aws_SES_Credentials.SenderEmailId,
    ReplyToAddresses: [],
  };
};
