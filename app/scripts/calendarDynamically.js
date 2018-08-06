"use strict";

// function that creates dummy data for demonstration
function createDummyData() {
	var date = new Date();
	var data = {};

	for (var i = 0; i < 10; i++) {
		data[date.getFullYear() + i] = {};
		for (var j = 0; j < 12; j++) {
			data[date.getFullYear() + i][j + 1] = {};
			for (var k = 0; k < Math.ceil(Math.random() * 10); k++) {
				var l = Math.ceil(Math.random() * 28);

				try {
						data[date.getFullYear() + i][j + 1][l].push({
							startTime: "10:00",
							endTime: "12:00",
							text: "Some Event Here"
						});
					} catch (e) {
						data[date.getFullYear() + i][j + 1][l] = [];
						data[date.getFullYear() + i][j + 1][l].push({
							startTime: "10:00",
							endTime: "12:00",
							text: "Some Event Here"
						});
					}
			}
		}
	}
	return data;
}

			// INSTEAD OF GRABBING THE DATA FROM AN AJAX REQUEST
			// I WILL BE DEMONSTRATING THE SAME EFFECT THROUGH MEMORY
			// THIS DEFEATS THE PURPOSE BUT IS SIMPLER TO UNDERSTAND
var serverData = createDummyData(); // use to test ajax

// stating variables in order for them to be global
var calendar, organizer;

const woofbtn = document.getElementById('woofbtn');

woofbtn.addEventListener('click', (e) => {
	const eventtext = document.getElementById('message-text');

	var c1 = Datepick1.getDate(true).replace("/","-").replace("/","-").replace("/","-");
	var startT = c1 + "T" + Timepick1.getDate(true) + ":00+08:00";

	var c2 = Datepick2.getDate(true).replace("/","-").replace("/","-").replace("/","-");
	var endT = c2 + "T" + Timepick2.getDate(true) + ":00+08:00";

	var data = {
		start: startT,
		end: endT,
		summary: eventtext.value,
	};
	console.log('button inside');

	if(eventtext.value != "" && endT > startT ){
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
		"#343a4080", // primary color
		"#343a4080", // primary dark color
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