var express = require('express');
var router = express.Router();

// REGISTER
router.get('/register', function(req, res){
    res.render('register');

});
// LOGIN
router.get('/login', function(req, res){
    res.render('login');
});
//Logout
router.get('/logout', function(req, res){
  res.render('logout');
});

// REGISTER USER
router.post('/register', function(req, res){
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;


  console.log("You are registered as " + name + ", with username " + username);
});

module.exports = router;
