const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.set('view-engine', 'ejs');

app.get('/', (req, res) => {
  res.render(__dirname + '/public/index.ejs');
});

app.listen(3000, () => console.log('server started'));