/* jshint esversion: 6 */
const fs = require('fs');
const readlineSync = require('readline-sync');
// const colors = require('colors/safe');
const colors = require('ansi-colors');
// const colors = require('chalk');

var __dirname = '/home/runner/os';
var home = __dirname + '/home';
var pwd = __dirname + '/home';

// Wish https://www.fossmint.com/wp-content/uploads/2017/03/Hyper-Best-Linux-Terminal.png

do {
	let x = pwd.replace(/home/g, '~').substr(13);
	if (pwd == __dirname) {	x = '/'	}

	var consoleText = readlineSync.question(colors.green('vandesm14@box') + ' ' + colors.blue(x + ' $ '));
	if (consoleText == 'exit') { return '' }
	console.log(command(consoleText));
} while (true);

function command(text) {
	text = text.match(/\S+/g);
	switch (text[0]) {
		case 'pwd': // [pwd]
			return pwd;
			break;
		case 'ls': // [ls]
			if (fs.existsSync(pwd)) {
				return getFiles();
			} else {
				return error('File/Dir does not exist', 'ls', 'File-System');
			}
			break;
		case 'cd':
			switch (true) {
				case text[1] == undefined: // [cd]
					pwd = home;
					return '';
					break;
				case text[1] == '..': // [cd ..]
					pwd = pwd.split('/').slice(0, -1).join('/');
					return '';
					break;
				case text[1][0] == '/': // [cd /] or [cd /*]
					let x = pwd.match(/\/(?:\w|)+/g).slice(0, -1).join('') + text[1];
					if (text[1][1] !== undefined) { // [cd /*]
						if (!fs.existsSync(pwd + x)) { return error('Dir does not exist', 'cd', 'File-System') }
						pwd += x;
					} else { // [cd /]
						pwd = __dirname; // Root Directory
					}
					return '';
					break;
				case /\w+/g.test(text[1]): // [cd *]
					if (!fs.existsSync(pwd + '/' + text[1])) { return error('Dir does not exist', 'cd', 'File-System') }
					pwd += '/' + text[1];
					return '';
					break;
			}
			return '';
			break;
		case 'cat': // [cat]
			return getFile(pwd + '/' + text[1]);
			break;
		case 'mkdir': // [mkdir *]
			return '';
			break;
		default:
			return 'Command error with: ' + text.join(' ');
			break;
	}
}

function getFiles(loc = pwd) { // Get files (for ls)
	var arr = [];
	fs.readdirSync(loc).forEach(file => {
		if (fs.lstatSync(loc + '/' + file).isDirectory()) { // Color blue if dir
			arr.push(colors.blue(file));
		} else {
			arr.push(file);
		}
	})
	return arr.join('\t');
}

function getFile(filename) { // Get file (protected)
	if (!fs.existsSync(filename)) { return error('Filw does not exist', 'getFile()', 'JS') }
	return fs.readFileSync(filename, 'utf8');
}

function typeofFile(loc = pwd) {
	if (fs.lstatSync(loc + '/' + file).isDirectory()) {
		return 'dir';
	} else {
		return 'file';
	}
}

function checkExist(loc) {
	if (fs.existsSync(filename)) {
		return true;
	} else {
		console.log(error('File/Dir does not exist!', 'checkExist()', 'JS'));
		return false;
	}
}

function error(err, on = '"Unknown"', type = '"Unknown"') {
	return colors.red(`${type}: An error occured on "${on}":\n${err}`);
}

// console.log(colors.red(getFile('test')));