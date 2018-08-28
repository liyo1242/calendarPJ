const grant_type = "authorization_code";
const redirect_uri = "https://dev-bluenet.herokuapp.com/html/orderList/cookie.html";
// const redirect_uri = "http://localhost:8080/html/orderList/cookie.html";
const client_id = "1573908688";
const client_secret = "d50d33bfcd8e8709e045e6dce3a183ae";

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
     getAccessToken(lineBody).then((token) => {
           return getLineId(token);
        });
};