'use strict';
const Dotenv = require("dotenv");

let envPath = "./.local.env";
Dotenv.config({ path: envPath, silent: true });

const envConfig = require('./envConfig'),
    apiConfig = require('./apiConfig');

module.exports = Object.assign({}, envConfig, apiConfig) || {}
