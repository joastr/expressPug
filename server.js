var express = require('express');
var app = express();
app.use('/img', express.static('image'));

app.set('view engine', 'pug');
app.set('views','./views');


app.use('/store', function (req,res, next){
    console.log('Jestem pośrednikiem przy żądaniu do /store');
    next();
});

app.get('/', function (req, res) {
    res.send('Hello world!');
});

app.get('/store', function (req, res) {
    res.send('To jest sklep');
});

app.get('/first-template', function(req, res){
    res.render('first-template');
});

app.get('/auth', function(req, res){
    res.render('login', {
        name: "GOOGLE LOGIN",
    });
});

app.get('/google', function (req, res) {
        res.render('google',{
            name: "GOOGLE RESPONSE",
        });
});
    

var server = app.listen(3000, 'localhost', function() {
        var host = server.address().address;
        var port = server.address().port;
    
        console.log('Przykładowa aplikacja nasłuchuje na http://' + host + ':' + port);
    });
    

app.use(function (req, res, next) {
    res.status(404).send('Wybacz, nie mogliśmy odnaleźć tego, czego żądasz!');
});
