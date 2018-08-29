const grant_type = "authorization_code";
const redirect_uri = "http://bn-calendar.herokuapp.com/cookie";
// const redirect_uri = "http://localhost:8080/html/orderList/cookie.html";
const client_id = "1603688403";
const client_secret = "715f9773c92f470c9d52b76e26adbf68";

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