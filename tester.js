var fs = require('fs');
console.log(__dirname);
console.log(fs.lstatSync(__dirname + '/index.js').isDirectory());