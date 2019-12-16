const client = io();
const path = window.location.pathname;

$(document).ready(function () {
	client.emit('register', path);
});