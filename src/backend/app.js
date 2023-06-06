const http = require('http');

const express = require('express');

const app = express();

const sequelize = require('./util/database');

const server = http.createServer(app);

const User = require('./models/user')

User.sync();

server.listen(8000)

