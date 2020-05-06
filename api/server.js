const express = require("express");

const middlewareConfig = require('../config/middleware-config');
const apiRouter = require("./api-router");

const server = express();

middlewareConfig(server);

server.use('/api', apiRouter);

server.get("/", (req, res) => {
    res.send('Add welcome message here')
});

module.exports = server;