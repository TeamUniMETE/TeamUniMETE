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

router.get('/logout', function(req, res){
  res.render('logout');
});

module.exports = router;
