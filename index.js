const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.set('view-engine', 'ejs');

app.use((req, res, next) => {
	res.locals.name = null;
	res.locals.content = null;
	res.locals.message = null;
	next();
})

app.get('/', (req, res) => {
	let file = fs.readFileSync('public/views/index.html');
	res.render(__dirname + '/public/includes/templates/window.ejs', { content: file });
});

app.get('/new', (req, res) => {
	let q = req.query.q;
	let file;
	let apps = fs.readdirSync('modules');
	apps = apps.map(el => el.replace('.html', ''));
	if (q) {
		file = fs.readFileSync(`modules/${q}.html`, 'utf8');
		res.render(__dirname + '/public/includes/templates/window.ejs', { content: file, title: q });
	} else {
		ejs.renderFile(__dirname + '/public/views/new.ejs', { apps }, (err, str) => {
			res.render(__dirname + '/public/includes/templates/window.ejs', { content: str, title: q });
		});
	}
});

app.get('/app/:q', (req, res) => {
	let q = req.params.q;
	let file;
	let apps = fs.readdirSync('modules');
	apps = apps.map(el => el.replace('.html', ''));
	ejs.renderFile(__dirname + '/public/views/new.ejs', { apps }, (err, str) => {
		res.render(__dirname + '/public/includes/templates/window.ejs', { content: str, title: q });
	});
});

app.listen(3000, () => console.log('server started'));