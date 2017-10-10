const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

//SET LISTENPORT
var portNr = 3000;

var index = require('./routes/index');
var tasks = require('./routes/tasks');

var app = express();

//VIEW ENGINE
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//SET STATIC FOLDER
app.use(express.static(path.join(__dirname, 'client')));

//BODY PARSER MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api', tasks);

app.listen(process.env.PORT || portNr, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});