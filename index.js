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
app.set('view-engine', 'ejs');

var apps = os.apps;
console.log(apps);
var tabs = [];

app.use((req, res, next) => { // defaults for ejs code
	res.locals.title = null;
	res.locals.content = null;
	res.locals.message = null;
	res.locals.apps = apps;
	next();
})

app.get('/', (req, res) => { // 
	res.redirect('/app/home');
});

app.get('/icon/:q', (req, res) => { // Path for taskbar icon
	let q = req.params.q;
	res.sendFile(__dirname + '/' + apps.find(el => el.name === q).getIcon());
});

app.get('/app/:q', (req, res) => { // Main path for module
	let q = req.params.q;
	let file;
	file = fs.readFileSync(`modules/${q}/index.html`, 'utf8');
	res.render(__dirname + '/public/includes/templates/window.ejs', { content: file, title: q });
});

app.get('/app/:q/*', (req, res) => { // Static files for modules
	let q = req.params.q;
	let file = req.path.replace(`/app/${q}/`, '');
	let app = apps.find(el => el.name === q);
	if (app) {
		res.sendFile(`${__dirname}/modules/${app.name}/${file}`);
	} else {
		res.status(404).send('Not Found');
	}
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
			tabs.splice(tabs.map(el => el.id).indexOf(socket.id), 1);
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