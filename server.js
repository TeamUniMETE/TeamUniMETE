var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

//SET PORT
var port = 3000;

var index = require('./routes/index');
var tasks = require('./routes/tasks');

var app = express();

app.set('views', path.join(__dirname, 'views'));

//SET STATIC FOLDER
app.use(express.static(path.join(__dirname, 'views')));

app.use('/', index);
app.use('/api', tasks);

app.listen(process.env.PORT || port, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
