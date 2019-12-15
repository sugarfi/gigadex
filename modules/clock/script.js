function update() {
	// Gets the current time
	let now = new Date();

	// Get the hours, minutes and seconds from the current time
	let hours = now.getHours();
	let minutes = now.getMinutes();
	let seconds = now.getSeconds();

	// Format hours, minutes and seconds
	if (hours < 10) hours = "0" + hours;
	if (minutes < 10) minutes = "0" + minutes;
	if (seconds < 10) seconds = "0" + seconds;

	// Get the day, month and year from the current time
	let day = now.getDay();
	let month = now.getMonth();
	let year = now.getFullYear();

	// Format hours, minutes and seconds
	if (day < 10) day = "0" + day;
	if (month < 10) month = "0" + month;

	// Gets the element we want to inject the clock into
	let clock = document.getElementById("clock");
	let date = document.getElementById("date");

	// Sets the elements inner HTML value to our clock data
	clock.innerHTML = `${hours}:${minutes}:${seconds}`;
	date.innerHTML = `${month}/${day}/${year}`;

	// Update every second
	setTimeout(update, 1000);
}

// Start clock
update();