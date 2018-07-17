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
			var serverData = createDummyData();

			// stating variables in order for them to be global
			var calendar, organizer;

			// initializing a new calendar object, that will use an html container to create itself
			calendar = new Calendar("calendarContainer", // id of html container for calendar
				"medium", // size of calendar, can be small | medium | large
				[
					"Sunday", // left most day of calendar labels
					3 // maximum length of the calendar labels
				],
				[
					"#826FF4", // primary color
					"#7C98FC", // primary dark color
					"#ffffff", // text color
					"#ffecb3" // text dark color
				]
			);

			// This is gonna be similar to an ajax function that would grab
			// data from the server; then when the data for a this current month
			// is grabbed, you just add it to the data object of the form
			// { year num: { month num: { day num: [ array of events ] } } }
			function dataWithAjax(date, callback) {

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
				dataWithAjax(new Date(), function(data) {
					// initializing a new organizer object, that will use an html container to create itself
					organizer = new Organizer("organizerContainer", // id of html container for calendar
						calendar, // defining the calendar that the organizer is related
						data // small part of the data of type object
					);
				});
				// after initializing the organizer, we need to initialize the onMonthChange
				// there needs to be a callback parameter, this is what updates the organizer
			};