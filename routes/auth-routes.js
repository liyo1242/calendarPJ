// welcome to this cute Router ~~~~~
const router = require('express').Router();
const passport = require('passport');
const SCOPES = ['https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/calendar','https://www.googleapis.com/auth/calendar.readonly'];

router.get('/login',(req,res)=>{
	res.render('login');
});

// router.get('/logout',(req,res) => {
// 	res.send("logging out");
// })
//
router.get('/deleteCookie',(req, res) => {
	req.logOut();
	req.session = null
	res.redirect('/auth/google');
});

router.get('/google',(req, res, next) => {console.log(req.session);next();} ,passport.authenticate('google',{accessType: 'offline',scope: SCOPES})
);

// access_type: 'offline', this will generate refreshToken
// more information about refreshToken --> https://developers.google.com/identity/protocols/OpenIDConnect
// prompt: 'consent' , the authorize screen is displayed every time when the user logs into your app ,so the fuckin refreshToken will always return 
// more information about prompt --> https://developers.google.com/identity/protocols/OpenIDConnect#prompt

// Calendar API, v3 scope : --> https://developers.google.com/identity/protocols/googlescopes
// https://www.googleapis.com/auth/calendar
// https://www.googleapis.com/auth/calendar.readonly

router.get('/google/redirect',passport.authenticate('google'),
  (req, res) => {
    //console.log("google-redirect req = " + JSON.stringify(req.user));
    res.redirect('/profile/');
  }
);

module.exports = router;