const fs = require('fs');
const socketio = require('socket.io');
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(['/app/:q','/default/:q'], express.static('public'));
app.set('view-engine', 'ejs');

var apps = fs.readdirSync('modules');
apps = apps.filter(el => el.match('.html'));
apps = apps.map(el => el.replace('.html', ''));

app.use((req, res, next) => {
	res.locals.title = null;
	res.locals.content = null;
	res.locals.message = null;
	res.locals.apps = apps;
	next();
})

app.get('/', (req, res) => {
	let file = fs.readFileSync('modules/default/home.html');
	res.render(__dirname + '/public/includes/templates/window.ejs', { content: file, apps });
});

app.get('/new', (req, res) => {
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

app.listen(3000, () => console.log('server started'));