// this file maybe not use
var google = require('googleapis');
var refresh = require('passport-oauth2-refresh');
const User = require('../models/user-model');

// This is an express callback.
function getGmailProfile(req, res, next) {
  var retries = 2;

  var send401Response = function() {
    return res.status(401).end();
  };

  // Get the user's credentials.
  User.findById(req.user, function(err, user) {
    if(err || !user) { return send401Response(); }

    var makeRequest = function() {
      retries--;
      if(!retries) {
        // Couldn't refresh the access token.
        return send401Response();
      }

      // Set the credentials and make the request.
      var auth = new google.auth.OAuth2;
      auth.setCredentials({
        access_token: user.accessToken,
        refresh_token: user.refreshToken
      });

      var gmail = google.gmail('v1');
      var request = gmail.users.getProfile({
        auth: auth,
        userId: 'me'
      });
      request.then(function(resp) {
        // Success! Do something with the response
        return res.json(resp);

      }, function(reason) {
        if(reason.code === 401) {
          // Access token expired.
          // Try to fetch a new one.
          refresh.requestNewAccessToken('google', user.refreshToken, function(err, accessToken) {
            if(err || !accessToken) { return send401Response(); }

            // Save the new accessToken for future use
            user.save({ accessToken: accessToken }, function() {
             // Retry the request.
             makeRequest();
            });
          });

        } else {
          // There was another error, handle it appropriately.
          return res.status(reason.code).json(reason.message);
        }
      });
    };

    // Make the initial request.
    makeRequest();
  });
}