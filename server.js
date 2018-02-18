const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const context = require('aws-lambda-mock-context');
var alexaskill = require('./src/alexaskill');


// Setup express webserver
const app = express();
app.use(bodyParser.json({ type: 'application/json' }));


// Setup simple request Logger
app.use(function (req, res, next) {
    console.log("["+req.method+'] :', req.originalUrl);
    next();
  });


// Setup Alexa route
app.post('/alexa/', function (req, res) {
    var ctx = context();
    alexaskill.handler(req.body, ctx);
    ctx.Promise
        .then(resp => { return res.status(200).json(resp); })
        .catch(err => {
            console.log(err);
        });
});

app.listen(3030, function () {
    console.log('Alexa Skill service ready on 3030 via http.!');
});