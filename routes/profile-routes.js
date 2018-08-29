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
  "styles": {
    "footer": {
      "separator": true
    }
  },
  "body": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "text",
        "text": "活動提醒",
        "weight": "bold",
        "color": "#1879e2",
        "size": "sm"
      },
      {
        "type": "box",
        "layout": "baseline",
        "contents": [
          {
            "type": "icon",
            "url": "https://www.bluenet-ride.com/images/drawable/cubeegroup/hellocubee.png",
            "size":"xl"
          },
          {
            "type": "text",
            "text": req.body.option + "分後提醒",
            "weight": "bold",
            "margin": "xl",
            "flex": 0,
            "size":"xl",
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
        "contents": [
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
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
            "contents": [
              {
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
            "contents": [
              {
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
            "contents": [
              {
                "type": "text",
                "text": "活動地點 :",
                "size": "sm",
                "color": "#555555",
                "flex": 2
              },
              {
                "type": "text",
                "text": req.body.location,
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
            "contents": [
              {
                "type": "text",
                "text": "活動內容 :",
                "size": "sm",
                "color": "#555555",
                "flex": 2
              },
              {
                "type": "text",
                "text": req.body.description,
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
            "contents": [
              {
                "type": "text",
                "text": "偏好 : ",
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
        "type": "box",
        "layout": "horizontal",
        "margin": "md",
        "contents": [
          {
            "type": "text",
            "text": "cubee bear",
            "color": "#aaaaaa",
            "size": "xs",
            "align": "end"
          }
        ]
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