const router = require('express').Router();
const refreshTokenMiddle = require('../middle/refresh-function.js');
const parseDataFormat = require('../middle/calendarFormat.js');
const request = require('request');

const authCheck = (req,res,next) => {
	if(req.user){
		res.redirect('/auth/login');
	}else{
		next();
	}
};

router.get('/', refreshTokenMiddle.calendarEventList, (req, res, next) => {
	//res.render('calendar', {data: req});
	res.render('testview');
});

router.get('/askEvent', refreshTokenMiddle.calendarAskEventList, parseDataFormat.dataFormat,(req, res, next) => {
  //console.log('Event get data = ' + JSON.stringify(req.calendarList));
  console.log("success Event server ");
  res.json({calendarList : req.calendarList , calendarNewList : req.newFormat}); //sucess in change the format to right size
});

router.post('/quickAdd', refreshTokenMiddle.calendarEventInsert, (req, res) => {

  //console.log('backend get data = ' + req.body.event);
  console.log("success click server ");
  // insert eventdata to google server !!!!
  res.sendStatus(200); //sucess in
});

router.post('/delete', refreshTokenMiddle.calendarEventDelete, (req, res) => {

  //console.log('backend get data = ' + req.body.event);
  console.log("success click server ");
  // insert eventdata to google server !!!!
  res.sendStatus(200); //sucess in
});

router.post('/update', refreshTokenMiddle.calendarEventUpdate, (req, res) => {

  //console.log('backend get data = ' + req.body.event);
  console.log("success update server ");
  // insert eventdata to google server !!!!
  res.sendStatus(200); //sucess in
});

router.post('/lineMessage', (req, res) => {
  console.log('in routerrrrrrrrrrrrrrrrrrrrrr');
  // var gandalfText = {
  //   "type": "text",
  //   "text": "活動將在" + req.body.option + "後開始\n\n" +
  //           "活動名稱 : " + req.body.summary + "\n" +
  //           "活動開始時間 : " + req.body.start + "\n" +
  //           "活動結束時間 : " + req.body.end + "\n" +
  //           "活動地點 : " + req.body.location + "\n" +
  //           "活動內容 : " + req.body.description + "\n" +
  //           "偏好 : " + req.body.transportation

  // };

  var gandalfText = {
    "type": "flex",
      "altText": "Flex Message",
      "contents": {
  "type": "bubble",
  "hero": {
    "type": "image",
    "url": "https://www.bluenet-ride.com/images/drawable/cubeegroup/surprisecubee.png",
    "size": "sm",
    "aspectRatio": "1:1",
    "aspectMode": "cover",
    "action": {
      "type": "uri",
      "uri": "https://linecorp.com"
    }
  },
  "body": {
    "type": "box",
    "layout": "vertical",
    "spacing": "md",
    "action": {
      "type": "uri",
      "uri": "https://linecorp.com"
    },
    "contents": [
      {
        "type": "text",
        "text": "活動將在" + req.body.option + "分後開始",
        "size": "xl",
        "weight": "bold"
      },
      {
        "type": "box",
        "layout": "vertical",
        "spacing": "sm",
        "contents": [
          {
            "type": "box",
            "layout": "baseline",
            "contents": [
              {
                "type": "icon",
                "url": "https://www.bluenet-ride.com/images/drawable/cubeegroup/hellocubee.png"
              },
              {
                "type": "text",
                "text": "活動名稱",
                "weight": "bold",
                "margin": "sm",
                "flex": 0
              },
              {
                "type": "text",
                "text": req.body.summary,
                "size": "sm",
                "align": "end",
                "color": "#aaaaaa"
              }
            ]
          },
          {
            "type": "box",
            "layout": "baseline",
            "contents": [
              {
                "type": "icon",
                "url": "https://i.imgur.com/opV3f3t.jpg"
              },
              {
                "type": "text",
                "text": "活動開始時間",
                "weight": "bold",
                "margin": "sm",
                "flex": 0
              },
              {
                "type": "text",
                "text": req.body.start,
                "size": "sm",
                "align": "end",
                "color": "#aaaaaa"
              }
            ]
          },
          {
            "type": "box",
            "layout": "baseline",
            "contents": [
              {
                "type": "icon",
                "url": "https://www.bluenet-ride.com/images/drawable/cubeegroup/hellocubee.png"
              },
              {
                "type": "text",
                "text": "活動結束時間",
                "weight": "bold",
                "margin": "sm",
                "flex": 0
              },
              {
                "type": "text",
                "text": req.body.end,
                "size": "sm",
                "align": "end",
                "color": "#aaaaaa"
              }
            ]
          },
          {
            "type": "box",
            "layout": "baseline",
            "contents": [
              {
                "type": "icon",
                "url": "https://www.bluenet-ride.com/images/drawable/cubeegroup/hellocubee.png"
              },
              {
                "type": "text",
                "text": "活動地點",
                "weight": "bold",
                "margin": "sm",
                "flex": 0
              },
              {
                "type": "text",
                "text": req.body.location,
                "size": "sm",
                "align": "end",
                "color": "#aaaaaa"
              }
            ]
          },
          {
            "type": "box",
            "layout": "baseline",
            "contents": [
              {
                "type": "icon",
                "url": "https://www.bluenet-ride.com/images/drawable/cubeegroup/hellocubee.png"
              },
              {
                "type": "text",
                "text": "活動內容",
                "weight": "bold",
                "margin": "sm",
                "flex": 0
              },
              {
                "type": "text",
                "text": req.body.description,
                "size": "sm",
                "align": "end",
                "color": "#aaaaaa"
              }
            ]
          },
          {
            "type": "box",
            "layout": "baseline",
            "contents": [
              {
                "type": "icon",
                "url": "https://www.bluenet-ride.com/images/drawable/cubeegroup/hellocubee.png"
              },
              {
                "type": "text",
                "text": "偏好",
                "weight": "bold",
                "margin": "sm",
                "flex": 0
              },
              {
                "type": "text",
                "text": req.body.transportation,
                "size": "sm",
                "align": "end",
                "color": "#aaaaaa"
              }
            ]
          }
        ]
      },
      {
        "type": "text",
        "text": "BlueNet Cubee 關心您",
        "wrap": true,
        "color": "#aaaaaa",
        "size": "xxs"
      }
    ]
  },
  "footer": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "spacer",
        "size": "xxl"
      },
      {
        "type": "button",
        "style": "primary",
        "color": "#905c44",
        "action": {
          "type": "uri",
          "label": "叫計程車",
          "uri": "https://dev-bluenet.herokuapp.com/html/callTaxi/login.html"
        }
      }
    ]
  }
}
}

  request.post("https://bn-bot.herokuapp.com/api",{
          headers: {
            'Content-Type' : 'application/json'
          },
          json:{
            "userid": req.body.userid,
            "messageType":"fuck",
            "forUserMessage": gandalfText
          }
        },
        (error, response, body) => {
          if (error) {
            console.log('Error while sending message' + error);
            return;
          }
          if (response.statusCode !== 200) {
            console.log("body",body);
            console.log('Error status code while sending message' + body.errMsgs);
            return;
          }
          return;
        })

  res.sendStatus(200);
})

module.exports = router;