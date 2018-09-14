"use strict";
const express = require("express"),
  router = express.Router(),
  fetchData = require("./fetchData");

/**
 * executes the assignment
 */
router.get(
  "/",
  (req, res, next) => {
    return fetchData.fetchDataAndProcess()
            .then(response=>{
              res.status(200).send(response);
            })
            .catch(error=>{
              res.status(500).send(error);
            })
  }
);


module.exports = router;
