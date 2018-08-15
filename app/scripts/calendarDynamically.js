"use strict";
var calendar, organizer;

//============================================
$(function(){
	$(".days").swipe({
	fingers:'all', swipeLeft:swipe, swipeRight:swipe, allowPageScroll:"auto"
});

function swipe(event, direction, distance, duration, fingerCount, fingerData, currentDirection) {
        //console.log([event, direction, distance, duration, fingerCount, fingerData, currentDirection]);
	    console.log("fuckfuckfuck4+ direction " + direction );
        if(direction == "left"){
    	  	$("#calendarContainer-month-next").click();
        }else if (direction == "right"){
           	$("#calendarContainer-month-back").click();
        }
    }
});

$('.appointDayAdd').click(function() {
    console.log($('#organizerContainer-date').html());
});

$('#gg').click(function(){
		console.log('ff4');
		if($('#gg').attr('button-data') != ""){
			if(confirm("確定要刪除嗎?")){
				console.log('ffffo4');
				var data = {
					id: $('#gg').attr('button-data')
				};
				fetch('/profile/delete', {
			    	method: 'POST', // or 'PUT'
				    body: JSON.stringify(data), // data can be `string` or {object}!
				    headers: new Headers({
						'Content-Type': 'application/json'
					})
				})
				$('#gg').attr('button-data',"");
				alert("已經刪除！");
			}
			else{
				alert("已經取消了刪除操作");
			}
		}
})


$('#uu').click(function(){
	// const eventTitle = document.getElementById('message-title');
	// const eventtext = document.getElementById('message-text');
	// const eventLocation = document.getElementById('message-location');
	// const eventreMinder = document.getElementById('message-reminder');
	// const eventreTransport = document.getElementById('message-transportation');

	$('#exampleModal input').prop('disabled',false);

	// var c1 = Datepick1.getDate(true).replace("/","-").replace("/","-").replace("/","-");
	// var startT = c1 + "T" + Timepick1.getDate(true) + ":00+08:00";

	// var c2 = Datepick2.getDate(true).replace("/","-").replace("/","-").replace("/","-");
	// var endT = c2 + "T" + Timepick2.getDate(true) + ":00+08:00";

	// var data = {
	// 	start: startT,
	// 	end: endT,
	// 	summary: eventTitle.value, //title
	// 	location: eventLocation.value,
	// 	description: eventtext.value,
	// 	id: $('#uu').attr('button-data')
	// };
	// 	if($('#uu').attr('button-data') != ""){
	// 		if(confirm("確定要更新嗎?")){
	// 			console.log('ffffo4');
	// 			fetch('/profile/update', {
	// 		    	method: 'POST', // or 'PUT'
	// 			    body: JSON.stringify(data), // data can be `string` or {object}!
	// 			    headers: new Headers({
	// 					'Content-Type': 'application/json'
	// 				})
	// 			}).then((data) => {console.log(data)})
	// 			$('#uu').attr('button-data',"");
	// 			alert("已經更新！");
	// 		}
	// 		else{
	// 			alert("已經取消更新操作");
	// 		}
	// 	}
})

$('#exampleModal').on('show.bs.modal', function (event) {
	$('#exampleModal input').prop('disabled',true);
	console.log('fuck you show');
  	var button = $(event.relatedTarget) // Button that triggered the modal
  	$(".btnpos").toggleClass('btnposflip');
  	console.log(button.data('whatever')); // Extract info from data-* attributes
  	if(button.data('whatever') != undefined){
	  	var modal = $(this);
	  	modal.find('#message-title').val(button.data('whatever').title);
	  	modal.find('#message-text').val(button.data('whatever').text);
	  	modal.find('#message-location').val(button.data('whatever').location);
	  	$('#gg').attr('button-data',button.data('whatever').id);
	  	$('#uu').attr('button-data',button.data('whatever').id);
	  	$('#woofbtn').attr('button-data',button.data('whatever').id);

	  	if(button.data('whatever').startTime != undefined && button.data('whatever').endTime != undefined ){
			var time = button.data('whatever').time;
			var d = new Date();
			$('#startTime').val(button.data('whatever').startTime);
			$('#startDate').val(time.slice(0,4) + '/' + time.slice(5,7) + '/' + time.slice(9));
			// === === === ===
			// === === === ===
			$('#endTime').val(button.data('whatever').endTime);
			$('#endDate').val(time.slice(0,4) + '/' + time.slice(5,7) + '/' + time.slice(9));
		}else if(button.data('whatever').time != undefined){
			var time = button.data('whatever').time;
			var d = new Date();
			$('#startTime').val(d.getHours() + ':' + d.getMinutes());
			$('#startDate').val(time.slice(0,4) + '/' + time.slice(5,7) + '/' + time.slice(9));
			// === === === ===
			// === === === ===
			$('#endTime').val(d.getHours() + ':' + d.getMinutes());
			$('#endDate').val(time.slice(0,4) + '/' + time.slice(5,7) + '/' + time.slice(9));
		}
		Timepick1.update();
		Datepick1.update();
		Timepick2.update();
		Datepick2.update();
	}
})

// modal disppear refresh calendar page

$('#exampleModal').on('hidden.bs.modal', function () {
	console.log('fuck you hidden');
	$('#exampleModal input').prop('disabled',false);
    $(".btnpos").toggleClass('btnposflip');
    // the high frequency operation maybe Waste of web resources =============== fix point
    dataWithAjax(function(data) {
		// initializing a new organizer object, that will use an html container to create itself
		organizer = new Organizer("organizerContainer", // id of html container for calendar
			calendar, // defining the calendar that the organizer is related
			data // small part of the data of type object
		);
	});
})

// ================================
$(".btnpos").click(function(){
	var d = new Date();
	var sendData = {
        id: "",
        title: "",
        text: "",
        location: ""
    }
    $(".btnpos").attr("data-whatever",JSON.stringify(sendData));
	$('#startTime').val(d.getHours() + ':' + d.getMinutes());
	$('#startDate').val(d.getFullYear()	+ '/' + (d.getMonth() + 1) + '/' + d.getDate());
	// === === === ===
	// === === === ===
	$('#endTime').val(d.getHours() + ':' + d.getMinutes());
	$('#endDate').val(d.getFullYear()	+ '/' + (d.getMonth() + 1) + '/' + d.getDate());
	Timepick1.update();
	Datepick1.update();
	Timepick2.update();
	Datepick2.update();
})

// ================================

const woofbtn = document.getElementById('woofbtn');

woofbtn.addEventListener('click', (e) => {
	const eventTitle = document.getElementById('message-title');
	const eventtext = document.getElementById('message-text');
	const eventLocation = document.getElementById('message-location');
	const eventreMinder = document.getElementById('message-reminder');
	const eventreTransport = document.getElementById('message-transportation');

	var c1 = Datepick1.getDate(true).replace("/","-").replace("/","-").replace("/","-");
	var startT = c1 + "T" + Timepick1.getDate(true) + ":00+08:00";

	var c2 = Datepick2.getDate(true).replace("/","-").replace("/","-").replace("/","-");
	var endT = c2 + "T" + Timepick2.getDate(true) + ":00+08:00";

	var data = {
		start: startT,
		end: endT,
		summary: eventTitle.value, //title
		location: eventLocation.value,
		description: eventtext.value,
		id: $('#woofbtn').attr('button-data')
	};
	console.log('button inside');
	// the Conditionality needs to be integrated ============================== fix point
	if($('#woofbtn').attr('button-data') != "" && eventTitle.value != "" && endT > startT ){
		if(confirm("確定要更新嗎?")){
			console.log('ffffo4');
			fetch('/profile/update', {
		    	method: 'POST', // or 'PUT'
			    body: JSON.stringify(data), // data can be `string` or {object}!
			    headers: new Headers({
					'Content-Type': 'application/json'
				})
			}).then((data) => {console.log(data)})
			$('#woofbtn').attr('button-data',"");
			alert("已經更新！");
		}
		else{
			alert("已經取消更新操作");
		}
	} else if(eventTitle.value != "" && endT > startT ){
		if(confirm("確定新增嗎?")){
			console.log('right');
			fetch('/profile/quickAdd', {
			  method: 'POST', // or 'PUT'
			  body: JSON.stringify(data), // data can be `string` or {object}!
			  headers: new Headers({
		  	  	'Content-Type': 'application/json'
		  	  })
			})
			.then((res) => {
				if(res.ok) {
					console.log('click ok');
					dataWithAjax(function(data) {
						// initializing a new organizer object, that will use an html container to create itself
						organizer = new Organizer("organizerContainer", // id of html container for calendar
							calendar, // defining the calendar that the organizer is related
							data // small part of the data of type object
						);
					});
					return;
				}
				throw new Error('failed');
			})
			.catch((err) => {
				console.log(err);
			});
		}
		else{
			alert("已經新增操作");
		}
	}
	else{
		alert('資料錯誤 小心火燭');
	}
	// ============================================= fix point end
	eventTitle.value = "";
	eventLocation.value = "";
	eventreTransport.value = "";
	eventreMinder.value = "";
	eventtext.value = "";
})
// initializing a new calendar object, that will use an html container to create itself
calendar = new Calendar("calendarContainer", // id of html container for calendar
	"medium", // size of calendar, can be small | medium | large
	[
		"日", // left most day of calendar labels
		3 // maximum length of the calendar labels
	],
	[
		"#A2A0A0", // primary color
		"#A2A0A0", // primary dark color
		"#ffffff", // text color
		"#ffecb3" // text dark color
	]
);

const Timepick1 = new Picker(document.querySelector('#startTime'), {
  format: 'HH:mm',
});
const Datepick1 = new Picker(document.querySelector('#startDate'), {
  format: 'YYYY/MM/DD',
});

const Timepick2 = new Picker(document.querySelector('#endTime'), {
  format: 'HH:mm',
});
const Datepick2 = new Picker(document.querySelector('#endDate'), {
  format: 'YYYY/MM/DD',
});

// const notifiy = new Picker(document.querySelector('#notifiy'), {
//   format: 'HH:mm',
// });

function dataWithAjax(callback) {
	fetch('/profile/askEvent', {method: 'GET'})
	.then((res) => {
		//console.log(res.json);
		if(res.ok) return res.json();
		throw new Error('failed');
	})
	.then((data) => {
        // TODO : Call the Callback to display the Data
 	    callback(data.calendarNewList);
	})
	.catch((error) => {
		console.log(error);
	});
};

window.onload = function() {
	dataWithAjax(function(data) {
		// initializing a new organizer object, that will use an html container to create itself
		organizer = new Organizer("organizerContainer", // id of html container for calendar
			calendar, // defining the calendar that the organizer is related
			data // small part of the data of type object
		);
	});
				// after initializing the organizer, we need to initialize the onMonthChange
				// there needs to be a callback parameter, this is what updates the organizer
};