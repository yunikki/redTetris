
var http = require('http');
var url = require("url");
var querystring = require('querystring');
var express = require('express');

const PORT = 8080;

var app = express();

app.get('/chien/:prenom', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.render('pets.ejs', { prenom: req.params.prenom, pets: 'chien' });
});

app.get('/compter/:nombre', function (req, res) {
    var noms = ['Robert', 'Jacques', 'David'];
    res.setHeader('Content-Type', 'text/html');
    res.render('page.ejs', { compteur: req.params.nombre, noms: noms });
});

app.get('/chat/:prenom', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.render('pets.ejs', { prenom: req.params.prenom, pets: 'chat' });
});

app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.send('Vous êtes à l\'accueil test');
});

app.use(function (req, res, next) {
    res.setHeader('Content-Type', 'text/html');
    res.status(404).send('Page introuvable !');
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
