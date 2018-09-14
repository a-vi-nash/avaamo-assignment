'use strict';


module.exports = {
  environmentName: process.env.NODE_ENV,
  appPort: 8088,
  protocol: "http://",
  subDomain: "",
  domain: "localhost",
  Promise: require("bluebird"),
  documentFetchUrl: process.env.GET_TEXT_URL,
  getWordDetailsUrl: process.env.LOOKUP_URL,
  getWordAPIKey:process.env.API_KEY,
  fetchCount:process.env.FETCH_COUNT
};
