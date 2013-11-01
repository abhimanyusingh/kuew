var express = require('express');
var app = express();

//Express Middleware used to be able to parse objected through POST commands
app.use(express.bodyParser());

app.get('/', function(req, res) {
    res.render('index.html');
});

//Port server is on. Defaulted to 8080.
app.listen(8060);
console.log('Datasift demo server is up and running!');