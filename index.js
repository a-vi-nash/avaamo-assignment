'use strict';

const express = require('express'),
    app = express();

/**
* Globally define the application config variables
**/
global.config = require('./server/config/');



const httpProtocol = require("http");

/**
* Allow headers for cross domain.
**/
app.use((req, res, next) => {
    const allowOrigin = req.headers.origin || "*";
    res.setHeader("Access-Control-Allow-Origin", allowOrigin);
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    next();
});

app.use(require('./server/controllers/'));

/**
* Default handler for invalid API endpoint.
**/
app.all('*', (req, res) => {
    res.status(global.config.default_not_found_http_code).json({"responseCode" : global.config.default_not_found_http_code});
});

/**
* Default handler for uncaught exception error.
**/
app.use((err, req, res, next) => {
    console.error("UUID=" + res._headers['x-request-id'], "UncaughtException is encountered", "Error=" + err, "Stacktrace=" + err.stack);
    let response = {"responseCode" : global.config.default_error_code, "responseDesc" : err.name};
    if (res.headersSent) {
        clearInterval(req.timer);
        response = JSON.stringify(response);
        response = response.replace(/^({)/, "");
        return res.end('",' + response);
    }
    res.status(global.config.default_error_code).json(response);
});

/**
* start express server.
**/
let httpServer = httpProtocol.createServer(app);

/**
* Server start port.
**/
httpServer.listen(global.config.appPort, () => {
    console.log(`Server started on ${global.config.environmentName.charAt(0).toUpperCase() + global.config.environmentName.slice(1)} server started at port ${global.config.appPort}`);
});
