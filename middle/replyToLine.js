const request = require('request');
const moment = require('moment');
module.exports.reply = (req, res, next) => {
    var gandalfUrl = "";
    switch (req.body.transportation) {
        case "計程車":
            gandalfUrl = `https://dev-bluenet.herokuapp.com/html/callTaxi/login.html?getoff=${req.body.location}`;
            break;
        case "捷運":
            gandalfUrl = `https://www.bluenet-ride.com/html/BluNet_MRT.html?from=line&location=${req.body.location}`;
            break;
        case "公車":
            gandalfUrl = `https://www.bluenet-ride.com/html/BluNet_BUS.html?from=line&location=${req.body.location}`;
            break;
        case "腳踏車":
            gandalfUrl = `https://www.bluenet-ride.com/html/BluNet_BIKE.html?from=line&location=${req.body.location}`;
            break;
        case "火車/高鐵":
            gandalfUrl = `https://www.bluenet-ride.com/html/BluNet_TRAIN.html?from=line&location=${req.body.location}`;
            break;
        case "自行開車":
            gandalfUrl = `https://www.bluenet-ride.com/html/Travel_plan.html?from=line&location=${req.body.location}`;
            break;
        default:
            gandalfUrl = 'https://www.bluenet-ride.com/html/Travel_plan.html?from=line';
            break;
    }

    var fuckstart = req.body.start;
    var fuckend = req.body.end;

    var fuckyouStart = `${moment(fuckstart).get('year')}%2d${(moment(fuckstart).get('month')+ 1)}%2d${moment(fuckstart).get('date')}%20${moment(fuckstart).get('hour')}%3a${moment(fuckstart).get('minute')}`;
    var fuckyouEnd = `${moment(fuckend).get('year')}%2d${(moment(fuckend).get('month') + 1)}%2d${moment(fuckend).get('date')}%20${moment(fuckend).get('hour')}%3a${moment(fuckend).get('minute')}`;

    var spfuckyouStart = `${moment(fuckstart).get('year')}%2d${(moment(fuckstart).get('month')+ 1)}%2d${moment(fuckstart).get('date')}%2f${moment(fuckstart).get('hour')}%3a${moment(fuckstart).get('minute')}`;
    var spfuckyouEnd = `${moment(fuckend).get('year')}%2d${(moment(fuckend).get('month') + 1)}%2d${moment(fuckend).get('date')}%2f${moment(fuckend).get('hour')}%3a${moment(fuckend).get('minute')}`;

    var fuckyoulabUrl = `line://msg/text/?${req.body.summary}%0a開始時間%3a${fuckyouStart}%0a結束時間%3a${fuckyouEnd}%0a活動地點%3a${req.body.location}%0a活動內容%3a${req.body.description}%0a`;
    //${eventStr}%0a=========================%0a轉傳到Cubee bot%0a${toBotUrl}
    var fuckfuckyoulabUrl = `https://bn-calendar.herokuapp.com?title=${req.body.summary}&start=${fuckyouStart}&end=${fuckyouEnd}&location=${req.body.location}&content=${req.body.description}&transport=${req.body.transportation}`;
    //title=${req.body.summary}&start=${fuckyouStart}&end=${fuckyouEnd}&location=${req.body.location}&content=${req.body.description}&transport=${req.body.transportation}
    var fuckinLabNotifyText = moment(fuckstart).subtract(parseInt(req.body.option), 'minute').get('hour') + ":" + moment(fuckstart).subtract(parseInt(req.body.option), 'minute').get('minute');
    console.log(fuckyoulabUrl);
    console.log(fuckfuckyoulabUrl);
    var gandalfText = {
        "type": "flex",
        "altText": "Flex Message",
        "contents": {
            "type": "bubble",
            "styles": {
                "footer": {
                    "separator": true
                }
            },
            "body": {
                "type": "box",
                "layout": "vertical",
                "contents": [{
                        "type": "box",
                        "layout": "baseline",
                        "contents": [{
                                "type": "icon",
                                "url": "https://www.bluenet-ride.com/images/drawable/cubeegroup/hellocubee.png",
                                "size": "xl"
                            },
                            {
                                "type": "text",
                                "text": fuckinLabNotifyText + ' 時提醒',
                                "weight": "bold",
                                "margin": "xl",
                                "flex": 0,
                                "size": "xl",
                                "color": "#aaaaaa"
                            }
                        ]
                    },
                    {
                        "type": "separator",
                        "margin": "xxl"
                    },
                    {
                        "type": "box",
                        "layout": "vertical",
                        "margin": "xxl",
                        "spacing": "sm",
                        "contents": [{
                                "type": "box",
                                "layout": "horizontal",
                                "contents": [{
                                        "type": "text",
                                        "text": "活動名稱 :",
                                        "size": "sm",
                                        "color": "#555555",
                                        "flex": 2
                                    },
                                    {
                                        "type": "text",
                                        "text": req.body.summary,
                                        "size": "sm",
                                        "wrap": true,
                                        "color": "#111111",
                                        "flex": 4
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "horizontal",
                                "contents": [{
                                        "type": "text",
                                        "text": "開始時間 :",
                                        "size": "sm",
                                        "color": "#555555",
                                        "flex": 2
                                    },
                                    {
                                        "type": "text",
                                        "text": new Date(req.body.start).toLocaleString(),
                                        "size": "sm",
                                        "color": "#111111",
                                        "wrap": true,
                                        "flex": 4
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "horizontal",
                                "contents": [{
                                        "type": "text",
                                        "text": "結束時間 :",
                                        "size": "sm",
                                        "color": "#555555",
                                        "flex": 2
                                    },
                                    {
                                        "type": "text",
                                        "text": new Date(req.body.end).toLocaleString(),
                                        "size": "sm",
                                        "color": "#111111",
                                        "flex": 4,
                                        "wrap": true
                                    }
                                ]
                            },
                            {
                                "type": "separator",
                                "margin": "xxl"
                            },
                            {
                                "type": "box",
                                "layout": "horizontal",
                                "contents": [{
                                        "type": "text",
                                        "text": "活動地點 :",
                                        "size": "sm",
                                        "color": "#555555",
                                        "flex": 2
                                    },
                                    {
                                        "type": "text",
                                        "text": (req.body.location != "" && req.body.location != undefined) ? req.body.location : "無",
                                        "size": "sm",
                                        "color": "#111111",
                                        "wrap": true,
                                        "flex": 4
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "horizontal",
                                "contents": [{
                                        "type": "text",
                                        "text": "活動內容 :",
                                        "size": "sm",
                                        "color": "#555555",
                                        "flex": 2
                                    },
                                    {
                                        "type": "text",
                                        "text": (req.body.description != "" && req.body.description != undefined) ? req.body.description : "無",
                                        "size": "sm",
                                        "color": "#111111",
                                        "wrap": true,
                                        "flex": 4
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "horizontal",
                                "contents": [{
                                        "type": "text",
                                        "text": "交通偏好 : ",
                                        "size": "sm",
                                        "color": "#555555",
                                        "flex": 2
                                    },
                                    {
                                        "type": "text",
                                        "text": req.body.transportation,
                                        "size": "sm",
                                        "color": "#111111",
                                        "wrap": true,
                                        "flex": 4
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "separator",
                        "margin": "xxl"
                    },
                    {
                        "type": "image",
                        "url": "https://i.imgur.com/eIja7k8.png",
                        "size": "3xl",
                        "align": "start",
                        "margin": "none",
                        "aspectRatio": "3:1",
                        "action": {
                            "type": "uri",
                            "label": "View details",
                            "uri": gandalfUrl
                        }
                    }, {
                        "type": "image",
                        "url": "https://i.imgur.com/fk4GlCD.png",
                        "size": "3xl",
                        "align": "start",
                        "aspectRatio": "3:1",
                        "action": {
                            "type": "uri",
                            "label": "View details",
                            "uri": fuckyoulabUrl
                        }
                    }, {
                        "type": "image",
                        "url": "https://i.imgur.com/EluffLB.png",
                        "size": "3xl",
                        "align": "start",
                        "aspectRatio": "3:1",
                        "action": {
                            "type": "uri",
                            "label": "View details",
                            "uri": fuckfuckyoulabUrl
                        }
                    }
                ]
            }
        }
    }

    request.post("https://bn-bot.herokuapp.com/api", {
            headers: {
                'Content-Type': 'application/json'
            },
            json: {
                "userid": req.body.userid,
                "messageType": "fuck",
                "forUserMessage": gandalfText
            }
        },
        (error, response, body) => {
            if (error) {
                console.log('Error while sending message' + error);
                return;
            }
            if (response.statusCode !== 200) {
                console.log("body", body);
                console.log('Error status code while sending message' + body.errMsgs);
                return;
            }
            return;
        })
    next();
}