const router = require('express').Router();
const refreshTokenMiddle = require('../middle/refresh-function.js');
const parseDataFormat = require('../middle/calendarFormat.js');

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

  console.log('backend get data = ' + req.body.event);
  console.log("success click server ");
  // insert eventdata to google server !!!!
  res.sendStatus(200); //sucess in
});

router.post('/delete', refreshTokenMiddle.calendarEventDelete, (req, res) => {

  console.log('backend get data = ' + req.body.event);
  console.log("success click server ");
  // insert eventdata to google server !!!!
  res.sendStatus(200); //sucess in
});

router.post('/update', refreshTokenMiddle.calendarEventUpdate, (req, res) => {

  console.log('backend get data = ' + req.body.event);
  console.log("success click server ");
  // insert eventdata to google server !!!!
  res.sendStatus(200); //sucess in
});

module.exports = router;