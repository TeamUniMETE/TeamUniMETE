const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    next();
})

var users = require('./users');
app.use('/users', users);


app.get('/', function(req, res) {
    res.send('LANDINGPAGE');
});

app.listen(process.env.PORT || 3000, function (){
  console.log('server is running on port %d in %s mode', this.address().port, app.settings.env);
});
