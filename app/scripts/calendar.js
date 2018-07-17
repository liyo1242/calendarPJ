console.log('Client-side code running');
const button = document.getElementById('myButton');

button.addEventListener('click', (e) => {
	const eventtext = document.getElementById('eventtext');
	const start = document.getElementById('startTime');
	const end = document.getElementById('EndTime');
	var data = {
		start: start.value,
		end: end.value,
		summary: eventtext.value,
	};
	console.log('button inside');

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
			return;
		}
		throw new Error('failed');
	})
	.catch((err) => {
		console.log(err);
	});
});

// setInterval(() => {
// 	fetch('click', {method: 'GET'})
// 	.then((res) => {
// 		if(res.ok) return res.json();
// 		throw new Error('failed');
// 	})
// 	.then((data) => {
// 		// document.getElementById('').interHTML = 0;
// 		console.log("hello world");
// 	})
// 	.catch((error) => {
// 		console.log(error);
// 	});
// }, 1000);