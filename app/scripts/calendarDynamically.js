"use strict";
var calendar, organizer;

// calendar days layout swipe function
$(function(){
	$(".days").swipe({
		fingers:'all', swipeLeft:swipe, swipeRight:swipe, allowPageScroll:"auto"
	});

	function swipe(event, direction, distance, duration, fingerCount, fingerData, currentDirection) {
	    console.log("fuckfuckfuck4+ direction " + direction );
        if(direction == "left"){
    	  	$("#calendarContainer-month-next").click();
        }else if (direction == "right"){
           	$("#calendarContainer-month-back").click();
        }
    }
});

// delete button click function
$('#gg').click(function(){
	var deleteId = $('#gg').attr('button-data');
	if(deleteId != ""){
		if(confirm("確定要刪除嗎?")){
			var data = {
				id: deleteId
			};
			fetch('/profile/delete', {
		    	method: 'POST',
			    body: JSON.stringify(data),
			    headers: new Headers({
					'Content-Type': 'application/json'
				})
			})
			.then(data => {
				if(data.status == 200){
					$('#gg').attr('button-data',"");
					alert("已經刪除！");
				}else{
					alert('King Arthur was assassinated')
				}
			})
		}
		else{
			alert("已經取消了刪除操作");
		}
	}
})

// edit button click function
$('#uu').click(function(){
	$('#exampleModal input').prop('disabled',false);
})

// The moment of Modal appearance will trigger
$('#exampleModal').on('show.bs.modal', function (event) {

	console.log('4+ appear');
	var button = $(event.relatedTarget) // Button that triggered the modal
  	console.log(button.data('whatever')); // Extract info from data-* attributes

	$(".btnpos").toggleClass('btnposflip');

  	if(button.data('whatever') != undefined){
  		if(button.data('whatever').id != "" && button.data('whatever').id != undefined){
			$('#exampleModal input').prop('disabled',true);
			$('#gg').attr('button-data',button.data('whatever').id);
	  		$('#uu').attr('button-data',button.data('whatever').id);
	  		$('#woofbtn').attr('button-data',button.data('whatever').id);
		}

	  	var modal = $(this);
	  	modal.find('#message-title').val(button.data('whatever').title);
	  	modal.find('#message-text').val(button.data('whatever').text);
	  	modal.find('#message-location').val(button.data('whatever').location);

	  	if(button.data('whatever').startTime != undefined && button.data('whatever').endTime != undefined ){
	  		// the days trigger modal have already exists data
			var time = button.data('whatever').time;
			$('#startTime').val(button.data('whatever').startTime);
			$('#startDate').val(time.slice(0,4) + '/' + time.slice(5,7) + '/' + time.slice(9));
			// === === === ===
			// === === === ===
			$('#endTime').val(button.data('whatever').endTime);
			$('#endDate').val(time.slice(0,4) + '/' + time.slice(5,7) + '/' + time.slice(9));
		}else if(button.data('whatever').time != undefined){
			// the days trigger modal have empty data
			var time = button.data('whatever').time;
			var d = new Date();
			var dayZero = (parseInt(time.slice(9)) < 10) ? ("0" + time.slice(9)) : time.slice(9);
			// time gap
			var offset = 0;
			var carry = 0;
			if(d.getHours() < 23){
				if(d.getMinutes() >= 45){
					carry = 1;
					offset = -45;
				}else {
					offset = 15;
				}
			}else if (d.getHours() == 23) {
				if(d.getMinutes() >= 45){
					offset = 0;
				}else {
					offset = 15;
				}
			}

			$('#startTime').val(d.getHours() + ':' + d.getMinutes());
			$('#startDate').val(time.slice(0,4) + '/' + time.slice(5,7) + '/' + dayZero);
			// === === === ===
			// === === === ===
			$('#endTime').val((d.getHours() + carry) + ':' + (d.getMinutes() + offset));
			$('#endDate').val(time.slice(0,4) + '/' + time.slice(5,7) + '/' + dayZero);
		}

		// picker content update
		Timepick1.update();
		Datepick1.update();
		Timepick2.update();
		Datepick2.update();
	}
})

// modal disppear refresh calendar page
$('#exampleModal').on('hidden.bs.modal', function () {
	console.log('4+ hidden');
	$('#exampleModal input').prop('disabled',false);
    $(".btnpos").toggleClass('btnposflip');
})

// ================================
$(".btnpos").click(function(){
	var d = new Date();
	var timeStr ="";

	if(d.getMonth() + 1 >= 10){
		timeStr = d.getFullYear() + ' ' + (d.getMonth() + 1) + '/ ' + d.getDate();
	}else{
		 timeStr = d.getFullYear() + ' 0' + (d.getMonth() + 1) + '/ ' + d.getDate();
	}
	var sendData = {
        id: "",
        title: "",
        text: "",
        location: "",
        time: timeStr
    }
    $(".btnpos").attr("data-whatever",JSON.stringify(sendData));
})

// ================================

$('#woofbtn').click(() => {
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
	if($('#woofbtn').attr('button-data') != "" && $('#woofbtn').attr('button-data') != undefined && eventTitle.value != "" && endT > startT ){
		if(confirm("確定要更新嗎?")){
			fetch('/profile/update', {
		    	method: 'POST', // or 'PUT'
			    body: JSON.stringify(data), // data can be `string` or {object}!
			    headers: new Headers({
					'Content-Type': 'application/json'
				})
			})
			.then((res) => {
				if(res.ok){
					dataWithAjax(function(data) {
						// initializing a new organizer object, that will use an html container to create itself
						organizer = new Organizer("organizerContainer", // id of html container for calendar
							calendar, // defining the calendar that the organizer is related
							data // small part of the data of type object
						);
					});
					alert("已經更新！");
					return;
				}
				throw new Error('failed');
			});
			$('#woofbtn').attr('button-data',"");
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
			alert("已經取消新增操作");
		}
	}
	else{
		alert('資料錯誤 小心火燭');
	}
	// ============================================= fix point end
	eventTitle.value = "";
	eventLocation.value = "";
	//eventreTransport.value = "";
	//eventreMinder.value = "";
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
  text: {
    title: '請輸入活動起始時間',
    cancel: '取消',
    confirm: '確認',
  },
  translate(type, text) {
    const suffixes = {
      hour: '時',
      minute: '分',
    };

    return Number(text) + suffixes[type];
  }
});
const Datepick1 = new Picker(document.querySelector('#startDate'), {
  format: 'YYYY/MM/DD',
  text: {
    title: '請輸入活動起始日期',
    cancel: '取消',
    confirm: '確認',
  },
  translate(type, text) {
    const suffixes = {
      year: '年',
      month: '月',
      day: '日'
    };

    return Number(text) + suffixes[type];
  }
});

const Timepick2 = new Picker(document.querySelector('#endTime'), {
  format: 'HH:mm',
  text: {
    title: '請輸入活動結束時間',
    cancel: '取消',
    confirm: '確認',
  },
  translate(type, text) {
    const suffixes = {
      hour: '時',
      minute: '分',
    };

    return Number(text) + suffixes[type];
  }
});
const Datepick2 = new Picker(document.querySelector('#endDate'), {
  format: 'YYYY/MM/DD',
  text: {
    title: '請輸入活動結束日期',
    cancel: '取消',
    confirm: '確認',
  },
  translate(type, text) {
    const suffixes = {
      year: '年',
      month: '月',
      day: '日'
    };

    return Number(text) + suffixes[type];
  }
});

const csTime = new Picker(document.querySelector('#csTime'), {
  format: 'mm',
  text: {
    title: '請選擇提醒時間',
    cancel: '取消',
    confirm: '確認',
  },
  translate(type, text) {
    const suffixes = {
      minute: '分',
    };

    return Number(text) + suffixes[type];
  }
});

$("#csTime").change(function(){
    $('#csTime + span')[0].innerHTML = "自訂 ( " + $('#csTime').val() + "分鐘 )";
});

function dataWithAjax(callback) {
	fetch('/profile/askEvent', {method: 'GET'})
	.then((res) => {
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
	    function initialize() {
		  var input = document.getElementById('message-location');
		  var options = {
		  types: ['(cities)'],
		  componentRestrictions: {country: "tw"}
		 };
		  new google.maps.places.Autocomplete(input,options);
		}

window.onload = function() {

	initialize();
	dataWithAjax(function(data) {
		// initializing a new organizer object, that will use an html container to create itself
		organizer = new Organizer("organizerContainer", // id of html container for calendar
			calendar, // defining the calendar that the organizer is related
			data // small part of the data of type object
		);
	});
};
