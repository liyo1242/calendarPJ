function getAccessToken(data) {

    return fetch('/lineAccessToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(function(response) {
            if (response.ok) return response.json();
            throw new Error('Request failed.');
        })
        .then(function(data) {
            // console.log(data);
            return data;
        })
        .catch(function(error) {
            console.log(error);
        });
};

function getLineId(data) {

    return fetch('/lineUserID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data, ["access_token"])
        })
        .then(function(response) {
            if (response.ok) return response.json();
            throw new Error('Request failed.');
        })
        .then(function(data) {
            // console.log(data);
            return data;
        })
        .catch(function(error) {
            console.log(error);
        });
};

// function getGuestKey() {

//     return fetch('/guestKey', {
//             method: 'GET'
//         })
//         .then(function(response) {
//             if (response.ok) return response.json();
//             throw new Error('Request failed.');
//         })
//         .then(function(data) {
//             // console.log(data);
//             return data;
//         })
//         .catch(function(error) {
//             console.log(error);
//         });
// };

// function BNUserVerify(p_lineID, p_guestKey, token) {

//     Promise.all([p_lineID, p_guestKey]).then((p) => {
//         var body = {
//             lineID: p[0].userId,
//             BNguestKey: p[1].guestKey,
//             lineToken: token.access_token
//         }
//         return fetch('/userVerify', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(body)
//             })
//             .then(function(response) {
//                 if (response.ok) return response.json();
//                 throw new Error('Request failed.');
//             })
//             .then(function(data) {
//                 // console.log(data);
//                 return data;
//             })
//             .catch(function(error) {
//                 console.log(error);
//             });
//     })
// };

// function BNUserSignin(p_lineID, p_guestKey, token) {

//     return Promise.all([p_lineID, p_guestKey]).then((p) => {
//         var body = {
//             lineID: p[0].userId,
//             BNguestKey: p[1].guestKey,
//             lineToken: token.access_token
//         }
//         return fetch('/userSignin', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(body)
//             })
//             .then(function(response) {
//                 if (response.ok) return response.json();
//                 throw new Error('Request failed.');
//             })
//             .then(function(data) {
//                 // console.log(data);
//                 return data;
//             })
//             .catch(function(error) {
//                 console.log(error);
//             });
//     })
// };

// function postOrder(body) {

//     return fetch('/postOrder', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(body)
//         })
//         .then(function(response) {
//             if (response.ok) return response.json();
//             throw new Error('Request failed.');
//         })
//         .then(function(data) {
//             // console.log(data);
//             return data;
//         })
//         .catch(function(error) {
//             console.log(error);
//         });
// };

// function submitOrder(body) {

//     return fetch('/submitOrder', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(body)
//         })
//         .then(function(response) {
//             if (response.ok) return response.json();
//             throw new Error('Request failed.');
//         })
//         .then(function(data) {
//             // console.log(data);
//             return data;
//         })
//         .catch(function(error) {
//             console.log(error);
//         });
// };