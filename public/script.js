const client = io();
const path = window.location.pathname;
const $ = require('jquery');

$(document).ready(function () {
	client.emit('register', path);
});