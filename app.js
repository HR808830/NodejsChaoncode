require('dotenv').config();
const express = require('express');
var bodyParser = require('body-parser')

var port = process.env.PORT || 8000

var app = express();
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    var enableCORS = function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, token, Content-Length, X-Requested-With, *');
        if ('OPTIONS' === req.method) {
            res.sendStatus(200);
        } else {
            next();
        }
    };
    app.all("/*", function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, token, Content-Length, X-Requested-With, *');
        next();
    });
    app.use(enableCORS);  
    app.use('/rest', require('./routes/index'));

    app.listen(port, () => {
        console.log(`The IOT app is up on port ${port}`);
    })

