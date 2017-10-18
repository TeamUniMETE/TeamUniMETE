var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var path = require('path');
cont url = require('url')
const {Client} = require('pg');

// ROUTES
var routes = require('./routes/index');
var users = require('./routes/users');

// INIT APP
var app = express();

// VIEW ENGINE-----DEFAULT-LAYOUT-----LAYOUT
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

// BODY-PARSER MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// SET STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));

// GLOBAL VARIABLES
app.use('/', routes);
app.use('/users', users);

function createUserAccount(user){
  let client = new Client({
    connectionString:process.env.DATABASE_URL,
    ssl:true
  });
  client.connect();

  let sql = 'INSERT INTO' "userAccounts"("name", "userName", "email", "password")
}


// APP LISTEN
app.listen(process.env.PORT || 3000, function (){
  console.log('server is running on port %d in %s mode', this.address().port, app.settings.env);
});
