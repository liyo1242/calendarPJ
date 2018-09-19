const grant_type = "authorization_code";
const redirect_uri = "http://bn-calendar.herokuapp.com/cookie";
// const redirect_uri = "http://localhost:8080/html/orderList/cookie.html";
const client_id = "1608728878";
const client_secret = "762f200bfdb76cffd77c4c915e72fbf7";

var search = window.location.search.split("&");
var s = search[0].split("=");
var code = s[1];

function BNprofile() {
    var lineBody = {
        grant_type: grant_type,
        code: code,
        redirect_uri: redirect_uri,
        client_id: client_id,
        client_secret: client_secret
    }
    return getAccessToken(lineBody).then((token) => {
           return getLineId(token);
        });
};