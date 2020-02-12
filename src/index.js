const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
require("dotenv").config();
const app = express();
require('dotenv').config();
const path = require('path');
//require('./services/passport.js');

const env = process.env.NODE_ENV || 'development';

app.use(function (req, res, next) {


    res.setHeader('Access-Control-Allow-Origin', '*');


    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');

    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(express.static("client/build"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
require('./app/controller/authController')(app);
require('./app/controller/projectController')(app);

if (process.env.NODE_ENV === 'production'){
   app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(_dirname, 'client', 'build', 'index.html'));
    });
}


app.listen(process.env.PORT || 5000); 
