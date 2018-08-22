const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const app = express();
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const key = require('./config/key');
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