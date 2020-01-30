const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const os = require('./os.js');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io').listen(http);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(['/app/:q','/default/:q'], express.static('public'));
app.set('view-engine', 'ejs');

var apps = os.apps.names();
var tabs = new os.TabList();

app.use((req, res, next) => { // defaults for ejs code
	res.locals.title = null;
	res.locals.content = null;
	res.locals.message = null;
	res.locals.apps = apps;
	next();
})

app.get('/', (req, res) => {
	res.render(__dirname + '/public/includes/templates/desktop.ejs');
});

app.get('/new', (req, res) => { //
	res.redirect('/default/home');
});

app.get('/new', (req, res) => { //
	ejs.renderFile(__dirname + '/public/views/new.ejs', { apps }, (err, str) => {
		res.render(__dirname + '/public/includes/templates/window.ejs', { content: str });
	});
});

app.get('/app/:q', (req, res) => {
	let q = req.params.q;
	let file;
	file = fs.readFileSync(`modules/${q}.html`, 'utf8');
	res.render(__dirname + '/public/includes/templates/window.ejs', { content: file, title: q });
});

app.get('/default/:q', (req, res) => {
	let q = req.params.q;
	let file;
	file = fs.readFileSync(`modules/default/${q}.html`, 'utf8');
	res.render(__dirname + '/public/includes/templates/window.ejs', { content: file, title: q });
});

http.listen(3000, () => console.log('server started'));

io.engine.generateId = (req) => {
	return randHex(6);
};

io.on('connection', (socket) => {
	socket.on('register', (data) => {
		data = data.split('/')[2];
		tabs.push(new os.Tab(socket.id, data), data);
	});
	socket.on('disconnect', (data) => {
		if (socket.id) {
			tabs.remove(socket.id);
		}
	});
});

function randHex(len) {
	var letters = '0123456789abcdef';
	var color = '';
	for (var i = 0; i < len; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

function copy(arr) {
	return JSON.parse(JSON.stringify(arr));
}
