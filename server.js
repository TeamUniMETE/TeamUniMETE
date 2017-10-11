const express = require('express')
const app = express()

app.use(express.static('public'))


function randomsentence(){
    let person = ["Hitler", "Stalin", "Gadaffi","Queen Elisabeth" , "Trump"];
    let act = [" pushes ", " farts on ", " saves ", " Ignores "];
    let victim = ["blind children", "gangters", "starving children"];
    
    let sentence = person[Math.floor(Math.random()*5)] + act[Math.floor(Math.random()*4)] + victim[Math.floor(Math.random()*5)];
    
    return sentence;
}

//Get endpoint
app.get('/CAH', function (req,res){
    
    res.send(randomsentence());
})


app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
