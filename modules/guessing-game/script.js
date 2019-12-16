// Get random number
function gen() { return Math.floor(Math.random() * 100) }
let number = gen();

document.getElementById("guess").addEventListener("keypress", event => {
	// Key pressed was enter
	if (event.key == "Enter") {
		// Get guess
		let guess = document.getElementById("guess").value;

		// Guess was correct
		if (guess == number) {
			// Reset guess
			document.getElementById("guess").value = "";
			// Show user guess was correct
			document.getElementById("answer").innerHTML = `The answer was ${guess}.`;
			// Generate new number
			number = gen();
		}
		// Guess was incorrect
		else document.getElementById("answer").innerHTML = `The answer is not ${guess}.`;
	}
});