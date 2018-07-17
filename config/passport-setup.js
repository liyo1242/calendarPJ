const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const keys = require('./key');
const User = require('../models/user-model');
var refresh = require('passport-oauth2-refresh');
var gcal = require('google-calendar');

passport.serializeUser((user,done) => {
	done(null,user.id);
});

passport.deserializeUser((id,done) => {
	User.findById(id).then((user) => {
		done(null,user);
	});
});


var strategy = new GoogleStrategy({
		clientID: keys.google.clientID,
    	clientSecret: keys.google.clientSecret,
    	callbackURL: "/auth/google/redirect",
    	passReqToCallback: true
	},(req, accessToken, refreshToken, params, profile, done) => {
		// console.log("params: " + JSON.stringify(params, null, 4));
		console.log("accessToken: " + accessToken);
		console.log("refreshToken: " + refreshToken);
		// console.log("profile: " + JSON.stringify(profile, null, 4));
		//CalendarList(accessToken);
		User.findOne({googleId:profile.id}).then((currentUser) => {
			if(currentUser){
				//already have the user
				console.log('already user is ',currentUser.username);
				//RefreshToken(currentUser.refreshToken);

				done(null,currentUser);
			}else{
				//save in mongoDB
				new User({
					accessToken:accessToken,
					refreshToken:refreshToken,
					username:profile.displayName,
					googleId:profile.id
				})
				.save()
				.then((newUser) => {
					console.log('new user created:');
					done(null,newUser);
				});
			}
		});
	})


passport.use(strategy);
refresh.use(strategy);

//https://mlab.com/databases/nn-oauth-test/collections/users?q=&f=&s=&pageNum=0&pageSize=10

function CalendarList(accessToken){
	var google_calendar = new gcal.GoogleCalendar(accessToken);

	google_calendar.events.list('primary', (err, calendarList) => {
	    if (err) return console.log('The API returned an error: ' + err);
	    // console.log(calendarList.summary);

	    console.log(calendarList.items[2]);
	    return calendarList.items[2];
	});
}

function RefreshToken(refreshToken){
	refresh.requestNewAccessToken('google', refreshToken, function(err, accessToken, refreshToken) {
		  	if (err) return console.log('The refreshToken returned an error: ' + err);
		  	console.log("new accessToken: " + accessToken);
			console.log("new refreshToken: " + refreshToken);
			CalendarList(accessToken);
	});
}

// note : refreshToken is only provided on the first authorization from the user
// if you forget to save ,your next time node app.js(testing an OAuth2 integration) will display refreshToken:undefine
// the bad google will not return the refresh_token again :D
// so please find a place to save the small poor refreshToken


// if you are too late to save your refreshToken , you can remove access in this url
// https://myaccount.google.com/u/0/permissions.
// and the next request will return a refresh_token

