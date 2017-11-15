var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser').text();
var jwt = require("jsonwebtoken");
var bcrypt = require('bcrypt');
var db = require('./dbconnect');


router.post('/', function(req, res) {

    
});


module.exports = router;
