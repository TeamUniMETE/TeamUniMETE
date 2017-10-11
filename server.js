var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

function rnGreeting() {
  var arr = ["Hello There", "Nice to see you", "Greetings and salutations"];
  var greeting = arr[Math.floor(Math.random() * 3)];

  return greeting;
}

app.get('/', function(req, res) {
  res.send("Howdy stranger!")
})

app.get('/gr/:name', function(req, res) {
  res.send(rnGreeting() + " " + req.params.name + "!")
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});