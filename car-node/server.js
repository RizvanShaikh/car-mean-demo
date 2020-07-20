//Import Config
var env = require('dotenv').config();

console.log("");
console.log("//************* Car Project *************//");
console.log("");

//importing a module file
const config = require('./lib/config');


// load external modules
const express = require("express");

const cors = require('cors')

const morgan = require('morgan');

// init express app
const app = express();

// app.use(cors())
app.use(cors());


// set server home directory
app.locals.rootDir = __dirname;

// config express
config.expressConfig(app, config.cfg.environment);

app.use(morgan('combined'));

// attach the routes to the app
require("./lib/route")(app);

// start server
app.listen(config.cfg.port, () => {
    console.info(`Express server listening on ${config.cfg.port}, in ${config.cfg.TAG} mode`);
});