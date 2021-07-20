const config = require('../../env/enviornment_variables');
const templParams = require('./params');
const fs = require('fs');
const TemplateConfigurationDetails = require('../../env/templateConfigurations');

exports.templateParamDefination = ((resData, templateDetails) => {

    var htmlData = "";

    //CONFIGURE OPERATIONS ACCORDING TO TEMPLATE CODE
    switch (resData.templateId) {
        // WELCOME TEMPLATE
        case 1: {
            htmlData = fs.readFileSync(__dirname + config.templatePath + TemplateConfigurationDetails[resData.templateId].path, "UTF-8");
            break;
        }
    }

    //PARAMS W.R.T AWS SES INTERFACE
    return templParams.SESParam(resData, templateDetails, htmlData);
})