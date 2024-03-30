// Set the launch date
const launchDate = new Date('January 1, 2025 00:00:00').getTime();

// Update the countdown timer every second
const updateCountdown = () => {
	// Get the current time
	const now = new Date().getTime();

	// Calculate the distance between the current time and the launch date
	const distance = launchDate - now;

	// Calculate the remaining time in days, hours, minutes, and seconds
	const days = Math.floor(distance / (1000 * 60 * 60 * 24));
	const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((distance % (1000 * 60)) / 1000);

	// Display the remaining time on the page
	document.getElementById('days').innerText = days;
	document.getElementById('hours').innerText= hours;
	document.getElementById('minutes').innerText = minutes;
	document.getElementById('seconds').innerText = seconds;

	// If the launch date has passed, display a message
	if (distance < 0) {
		document.getElementById('days').innerText = '0';
		document.getElementById('hours').innerText = '0';
		document.getElementById('minutes').innerText = '0';
		document.getElementById('seconds').innerText = '0';
		document.querySelector('h1').innerText = 'Launched!';
	}
};

// Start the countdown timer
updateCountdown();
setInterval(updateCountdown, 1000);