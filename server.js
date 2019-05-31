var express = require('express'); //import de la bibliothèque Express
var app = express(); //instanciation d'une application Express

//Redirection vers l'index
app.get('/', function(req, res) {
    res.sendFile(__dirname+"/index.html");
});

//Récupération du texte à afficher
app.get('/content', function(req, res) {
    res.sendFile(__dirname+"/content.txt");
});

//Récupération d'une page
app.get('/*', function(req, res) {
    res.sendFile(__dirname+req.url);
});

app.listen(22233); //commence à accepter les requêtes
console.log("App listening on port 22233...");
