const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors')
const logger = require('morgan');

// Connect to mongo
mongoose
    .connect('mongodb://heroku_dw5c9h73:g0gdfjok496bn2ped7oc3batdd@ds135796.mlab.com:35796/heroku_dw5c9h73', {
        useNewUrlParser: true
    })
    .then(x => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    })
    .catch(err => {
        console.error('Error connecting to mongo', err)
    });

// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000'] // <== this will be the URL of our React app (it will be running on port 3000)
}));

var indexRouter = require('./routes/index');
var projectRouter = require('./routes/project');

app.use('/', indexRouter);
app.use('/project', projectRouter);

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);