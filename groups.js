var express = require('express');
var router = express.Router();
var db = require('./dbconnect'); //database
var bodyParser = require('body-parser').text();
var jwt = require("jsonwebtoken");

var secret = "frenchfriestastegood!"; //used to check the token
var logindata; //logindata from the token

//Authorize all travel-endpoints --------------------
router.use(function (req, res, next) {

    //get the token from the URL-variable named 'token'
    var token = req.query['token'];

    if (!token) {
        res.status(403).json({msg: "No token received"}); //send
        return; //quit
    }
    else {
        try {
          logindata = jwt.verify(token, secret); //check the token
        }
        catch(err) {
          res.status(403).json({msg: "The token is not valid!"}); //send
          return; //quit
        }
    }

    next(); //we have a valid token - go to the requested enpoint
});

//endpoint: GET travels -----------------------------
router.get('/', function (req, res) {

    var sql = `PREPARE get_travels (text) AS
            SELECT * FROM travelsview WHERE loginname=$1;
            EXECUTE get_travels('${logindata.loginname}')`;

    //var sql = 'SELECT * FROM travelsview';
    db.any(sql).then(function(data) {

        db.any("DEALLOCATE get_travels");

        res.status(200).json(data); //success!

    }).catch(function(err) {

        res.status(500).json(err);

    });
});

//endpoint: POST travels -----------------------------
router.post('/', bodyParser, function (req, res) {

    var upload = JSON.parse(req.body);

    var sql = `PREPARE insert_travel (int, timestamp, timestamp, int, text, text) AS
                INSERT INTO travels VALUES(DEFAULT, $2, $3, $4, $5, $6); EXECUTE insert_travel
                (0, '${upload.starttime}', '${upload.endtime}', ${upload.km}, '${upload.descr}', '${logindata.loginname}')`;

    db.any(sql).then(function(data) {

        db.any("DEALLOCATE insert_travel");
        res.status(200).json({msg: "insert ok"}); //success!

    }).catch(function(err) {

        res.status(500).json(err);

    });
});

//endpoint: DELETE travels -----------------------------
router.delete('/', function (req, res) {

    var upload = req.query.travelid; //should be sanitized

    var sql = `PREPARE delete_travel (int, text) AS
            DELETE FROM travels WHERE id=$1 AND loginname=$2 RETURNING *;
            EXECUTE delete_travel('${upload}', '${logindata.loginname}')`;

    db.any(sql).then(function(data) {

        db.any("DEALLOCATE delete_travel");

        if (data.length > 0) {
            res.status(200).json({msg: "delete ok"}); //success!
        }
        else {
            res.status(200).json({msg: "can't delete"});
        }

    }).catch(function(err) {
        res.status(500).json(err);
    });
});

//export module -------------------------------------
module.exports = router;
