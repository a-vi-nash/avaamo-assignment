'use strict';
const express = require('express'),
    router = express.Router();

router.use('/execute', require('./execute'));

module.exports = router;
