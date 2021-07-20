const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());

app.use(cors());


const sendMail = require('../service/sendMail');

//BASE PATH 
app.get('/', (req, res) => {
    res.send({
        status: 200,
        message: 'Application is working fine!'
    })
})

//POST: SEND EMAIL(s) TO PARAM DATA
app.get('/users/sendmail', (req, res) => {
    sendMail.MailMerge_AWS_SES(req, res)
    .then(data=>{
        res.send(data);
    })
});

module.exports = app;