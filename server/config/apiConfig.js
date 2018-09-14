
'use strict';
const config = {
    "default_success_http_code" : 200,
    "default_not_found_http_code" : 404,
    "unauthorized_http_code": 401,
    "default_error_http_code" : 400,
    "default_not_found_message": "No records found",
    "default_success_message" : "Successfully processed the request",
    "default_error_message" : "Sorry, invalid request",
    "unauthorized_message": "Access denied due to invalid credentials",
    "default_error_code":500
};

module.exports = config;
