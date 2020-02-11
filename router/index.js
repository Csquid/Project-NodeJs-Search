const express = require("express");
const app = express();
const router = express.Router();
const path = require('path');
const search = require('./search')

router.use('/search', search);

router.get('/', function(req, res) {
    // res.sendFile(__dirname + "/public/index.html");
    res.sendFile(path.join(__dirname, "../public/main.html"));
});

module.exports = router;