var client = io();
var path = window.location.pathname;

$(document).ready(function () {
	client.emit('register', path);
});