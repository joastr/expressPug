var express = require('express');
var app = express();
app.use('/img', express.static('img/image'));

app.set('view engine', 'pug');
app.set('views','./views');

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('./config');
var googleProfile = {};

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret:config.GOOGLE_CLIENT_SECRET,
    callbackURL: config.CALLBACK_URL
},
function(accessToken, refreshToken, profile, cb) {
    googleProfile = {
        id: profile.id,
        displayName: profile.displayName
    };
    cb(null, profile);
}
));

app.set('view engine', 'pug');
app.set('views', './views');
app.use(passport.initialize());
app.use(passport.session());




// app.use('/store', function (req,res, next){
//     console.log('Jestem pośrednikiem przy żądaniu do /store');
//     next();
// });

// app.get('/', function (req, res) {
//     res.send('Hello world!');
// });

// app.get('/store', function (req, res) {
//     res.send('To jest sklep');
// });

// app.get('/first-template', function(req, res){
//     res.render('first-template');
// });

// app.get('/auth', function(req, res){
//     res.render('login', {
//         name: "GOOGLE LOGIN",
//     });
// });

// app.get('/google', function (req, res) {
//         res.render('google',{
//             name: "GOOGLE RESPONSE",
//         });
// });

//app routes
app.get('/', function(req, res){
    res.render('index', { 
        user: req.user,
        name: "LOGIN AUTH" 
    });
});

app.get('/logged', function(req, res){
    res.render('logged', { user: googleProfile });
});
//Passport routes
app.get('/auth/google',
passport.authenticate('google', {
scope : ['profile', 'email']
}));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect : '/logged',
        failureRedirect: '/'
    }));


    

var server = app.listen(3000, 'localhost', function() {
        var host = server.address().address;
        var port = server.address().port;
    
        console.log('Przykładowa aplikacja nasłuchuje na http://' + host + ':' + port);
    });
    

app.use(function (req, res, next) {
    res.status(404).send('Wybacz, nie mogliśmy odnaleźć tego, czego żądasz!');
});
