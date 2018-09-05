const request = require('request');
module.exports.reply = (req, res, next) => {
  var gandalfUrl = "";
  switch(req.body.transportation){
    case "計程車":
      gandalfUrl = "https://dev-bluenet.herokuapp.com/html/callTaxi/login.html";
    break;
    case "捷運":
      gandalfUrl = "https://www.bluenet-ride.com/html/BluNet_MRT.html";
    break;
    case "公車":
      gandalfUrl = "https://www.bluenet-ride.com/html/BluNet_BUS.html";
    break;
    case "腳踏車":
      gandalfUrl = "https://www.bluenet-ride.com/html/BluNet_BIKE.html";
    break;
    case "火車/高鐵":
      gandalfUrl = "https://www.bluenet-ride.com/html/BluNet_TRAIN.html";
    break;
    case "自行開車":
      gandalfUrl = "https://www.bluenet-ride.com/html/Travel_plan.html";
    break;
  }


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
        "type": "button",
        "action": {
          "type": "uri",
          "label": "轉乘資訊",
          "uri": gandalfUrl
        },
        "style": "link",
        "color": "#1879e2",
        "flex": 0,
        "gravity": "bottom"
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
  next();
}