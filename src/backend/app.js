const http = require('http');

const express = require('express');

const app = express();

const server = http.createServer(app);

//const sequelize = require('./util/database');
//sequelize.sync();

const User = require('./models/user');
const Paper = require('./models/paper');
const Section = require('./models/section');
const Review = require('./models/review');


User.sync();
Paper.sync();
Section.sync();
Review.sync();

server.listen(8000)

