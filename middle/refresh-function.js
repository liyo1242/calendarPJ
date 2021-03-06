const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const keys = require('../config/key');
var refresh = require('passport-oauth2-refresh');
var gcal = require('google-calendar');
var google_calendar;


var strategy = new GoogleStrategy({
		clientID: keys.google.clientID,
    	clientSecret: keys.google.clientSecret,
    	callbackURL: "/auth/google/redirect",
    	passReqToCallback: true
	},(req, accessToken, refreshToken, params, profile, done) => {
		// console.log("params: " + JSON.stringify(params, null, 4));
		console.log("accessToken: " + accessToken);
		//console.log("refreshToken: " + refreshToken);
	})

refresh.use(strategy);

module.exports.calendarEventList = (req, res, next) => {
	refresh.requestNewAccessToken('google', req.user.refreshToken, function(err, accessToken, refreshToken) {
		if (err) return console.log('The refreshToken returned an error: ' + err);
		google_calendar = new gcal.GoogleCalendar(accessToken);

		google_calendar.events.list('primary', (err, calendarList) => {
		    if (err) return console.log('The API returned an error: ' + err);
			req.calendarList = calendarList.items;
			next();
		});
	});
}

module.exports.calendarAskEventList = (req, res, next) => {
	google_calendar.events.list('primary', (err, calendarList) => {
	    if (err) return console.log('The API returned an error: ' + err);
		req.calendarList = calendarList.items;
		next();
	});
}

module.exports.calendarEventQuickadd = (req, res, next) => {
	google_calendar.events.quickAdd('primary', req.body.event, (err, calendarList) => {
	    if (err) return console.log('The API returned an error: ' + err);
		next();
	});
}

module.exports.calendarEventInsert = (req, res, next) => {
	console.log('calendarEventInsert middleware coming');
	console.log("##" + req.body.recurrence);
	google_calendar.events.insert('primary',{
        'end': { 'dateTime': req.body.end,"timeZone": "Asia/Taipei" },
    	'start': { 'dateTime': req.body.start ,"timeZone": "Asia/Taipei"},
        'summary': req.body.summary,
        'location': req.body.location,
        'description': req.body.description,
        'recurrence': req.body.recurrence
    }, (err, newCal) => {
	    if (err) {
	    	console.log('The API returned an error: ' + JSON.stringify(err));
		}
		next();
	});
}

module.exports.calendarEventUpdate = (req, res, next) => {
	console.log('calendarEventupdate middleware coming');
	google_calendar.events.update('primary', req.body.id, {
        'end': { 'dateTime': req.body.end ,"timeZone": "Asia/Taipei"},
    	'start': { 'dateTime': req.body.start,"timeZone": "Asia/Taipei" },
        'summary': req.body.summary,
        'location': req.body.location,
        'description': req.body.description
    }, (err, newCal) => {
	    if (err) {
	    	console.log('The API returned an error: ' + JSON.stringify(err));
		}
		next();
	});
}

module.exports.calendarEventDelete = (req, res, next) => {
	console.log(req.body.id);
	console.log('calendarEventdelete middleware coming');
	google_calendar.events.delete('primary', req.body.id
		, (err, newCal) => {
	    if (err) {
	    	console.log('The API returned an error: ' + JSON.stringify(err));
		}
		next();
	});
}

// function CalendarList(accessToken){
// 	var google_calendar = new gcal.GoogleCalendar(accessToken);

// 	google_calendar.events.list('primary', (err, calendarList) => {
// 	    if (err) return console.log('The API returned an error: ' + err);
// 	    // console.log(calendarList.summary);

// 	    console.log(calendarList.items[2]);
// 	    return calendarList.items[2];
// 	});
// }

// function RefreshToken(refreshToken){
// 	refresh.requestNewAccessToken('google', refreshToken, function(err, accessToken, refreshToken) {
// 		  	if (err) return console.log('The refreshToken returned an error: ' + err);
// 		  	console.log("new accessToken: " + accessToken);
// 			console.log("new refreshToken: " + refreshToken);
// 			CalendarList(accessToken);
// 	});
// }

// note : refreshToken is only provided on the first authorization from the user
// if you forget to save ,your next time node app.js(testing an OAuth2 integration) will display refreshToken:undefine
// the bad google will not return the refresh_token again :D
// so please find a place to save the small poor refreshToken


// if you are too late to save your refreshToken , you can remove access in this url
// https://myaccount.google.com/u/0/permissions.
// and the next request will return a refresh_token

