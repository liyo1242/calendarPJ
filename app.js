const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const app = express();
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const key = require('./config/key');
const request = require('request');
const cookiesSession = require('cookie-session');
const passport = require('passport');
// var expressVue = require("express-vue");


app.set('view engine','ejs');

app.use(express.static(__dirname + '/app')); //靜態資料夾

app.use('/picker', express.static('node_modules/pickerjs/dist'));
app.use('/rrule', express.static('node_modules/rrule/dist/es5'));

mongoose.connect(key.mongodb.dbURL,() => {
	console.log('connected to mongoDB');
});

app.use(cookiesSession({
    maxAge:24*60*60*1000,
    keys:[key.session.cookieKey]
}))

app.use(require("body-parser").json()); // fetch req data

app.use(passport.initialize());
app.use(passport.session());


app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);

app.get('/',(req,res) => {
    res.render('login');
	// res.render('lineLogin');
});

app.get('/cookie',(req,res) => {
    res.render('cookie');
});

app.get('/login',(req,res) => {
    res.render('login');
});

app.listen(process.env.PORT || 3000, () => {
	console.log('app now listening for requests on port 3000');
});

//npm install
    // "cookie-session": "^2.0.0-beta.3" //session cookie~~ 這我做著玩的
	// "ejs": "^2.5.9",			   // js模板引擎
    // "express": "^4.16.3",
    // "google-calendar": "^1.3.2",
    // "nodemon": "^1.17.3",       // 方便觀察而已~~ cmd的指令 nodemon app.js  不用每次都 node app.js
    // "passport": "^0.4.0",       // 認證 oauth 套件 http://www.passportjs.org/docs/google/
    // "passport-google-oauth": "^1.0.0",
    // "passport-oauth2-refresh": "^1.0.0"  //refreshToken 需要

// token
app.post('/lineAccessToken', (req, res) => {

    var formBody = [];
    var encodedKey, encodedValue;
    for (var property in req.body) {
        encodedKey = encodeURIComponent(property);
        encodedValue = encodeURIComponent(req.body[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    request.post("https://api.line.me/oauth2/v2.1/token", {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: formBody
        },
        (error, response, body) => {
            console.log("lineAccessToken-response-statusCode", response.statusCode);
            if (error) {
                console.log('Error while sending message' + error);
                return;
            }
            if (response.statusCode !== 200) {
                console.log('Error status code while sending message ' + body.errMsgs);
                return;
            }
            console.log('Send registerPost succeeded');
            res.send(body);
        })

});

// line userID
app.post('/lineUserID', (req, res) => {

    request.get("https://api.line.me/v2/profile", {
            headers: {
                'Authorization': 'Bearer ' + req.body.access_token
            }
        },
        (error, response, body) => {
            console.log("lineUserID-response-statusCode", response.statusCode);
            if (error) {
                console.log('Error while sending message' + error);
                return;
            }
            if (response.statusCode !== 200) {
                console.log('Error status code while sending message ' + body.errMsgs);
                return;
            }
            console.log('Send registerPost succeeded');
            res.send(body);
        })

});