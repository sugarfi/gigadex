/* jshint esversion: 6 */
/* jshint -W027  */
/* jshint -W061 */
const fs = require('fs');
const readlineSync = require('readline-sync');
// const colors = require('colors/safe');
const colors = require('ansi-colors');
// const colors = require('chalk');

__jnixdirname = __dirname + '/os';
home = __jnixdirname + '/home';
pwd = home;

cmd = {};

do {
	let x = pwd;
	if (pwd.includes(home)) {
		x = pwd.replace(home, '~');
	} else {
		x = pwd.replace(__jnixdirname, '');
	}
	if (pwd == __jnixdirname) {
		x = '/';
	}

	var consoleText = readlineSync.question(colors.green('root@jnix') + ' ' + colors.blue(x + ' # '));
	if (consoleText == 'exit') {
		return '';
	}
	let out = command(consoleText);
	if (out !== undefined || out !== '') {
		console.log(out);
	}
} while (true);

function command(text) {
	text = text.match(/\S+/g);
	let hold;
	switch (text[0]) {
		case 'pwd': // [pwd]
			return pwd;
			break;
		case 'ls': // [ls]
			if (fs.existsSync(pwd)) {
				return getFiles();
			} else {
				return error('File/Path does not exist', 'ls', 'File-System');
			}
			break;
		case 'cd': // [cd]
			hold = parsePath(text[1], true);
			if (!hold.err) {
				pwd = hold.path;
				return '';
			} else {
				return hold.err;
			}
			break;
		case 'cat': // [cat]
			return readFile(pwd + '/' + text[1]);
			break;
		case 'mkdir': // [mkdir]
			return '';
			break;
		case 'node': // [node]
			return runNodeScript(text.slice(1, text.length).join(' '));
			break;
		case 'clear': // [clear]
			return console.clear();
			break;
		default:
			return colors.red('Command error with: ' + text.join(' '));
	}
}

function runNodeScript(script) {
	return eval(script);
}

function runCommandFile() {

}

function parsePath(path, limitDir = false) {
	let ret = {
		path: '',
		err: false
	};
	switch (true) {
		case path == undefined: // [cmd]
			ret.path = home;
			break;
		case path == '..': // [cmd ..]
			ret.path = pwd.split('/').slice(0, -1).join('/');
			break;
		case path[0] == '/': // [cmd /] or [cmd /*]
			if (path[1] !== undefined) { // [cmd /*]
				if (!fs.existsSync(__jnixdirname + path)) {
					ret.err = error('Path does not exist', 'parsePath', 'File-System');
				}
				ret.path = __jnixdirname + path; // Relative to root
			} else { // [cmd /]
				ret.path = __jnixdirname; // Root Directory
			}
			break;
		case /\w+/g.test(path): // [cmd *]
			if (!fs.existsSync(pwd + '/' + path)) {
				ret.err = error('Path does not exist', 'parsePath', 'File-System');
			}
			ret.path = path + '/' + path;
			break;
	}
	if (typeofPath(ret.path)) {

	}
	return ret;
}

function getFiles(loc = pwd) { // Get files (for [ls])
	var arr = [];
	fs.readdirSync(loc).forEach(file => {
		if (fs.lstatSync(loc + '/' + file).isDirectory()) { // Color blue if dir
			arr.push(colors.blue(file));
		} else {
			arr.push(file);
		}
	});
	return arr.join('\t');
}

function readFile(filename) { // Get file contents (for [cat])
	if (!fs.existsSync(filename)) {
		return error('File does not exist', 'getFile()', 'JS');
	}
	return fs.readFileSync(filename, 'utf8');
}

function typeofPath(path = pwd) {
	let ret = {
		path: '',
		err: false
	};
	if (fs.existsSync(path)) {
		if (fs.lstatSync(path).isDirectory()) {
			ret.path = 'dir';
		} else {
			ret.path = 'file';
		}
	} else {
		ret.err = error('Path does not exist', 'typeofPath', 'File-System');
	}
	return ret;
}

// $Note: This function is not needed
// function pathExist(path) {
// 	if (fs.existsSync(path)) {
// 		return true;
// 	} else {
// 		// console.log(error('File/Path does not exist!', 'checkExist()', 'JS'));
// 		return false;
// 	}
// }

function error(err, on = 'Unknown', type = 'Unknown') {
	return colors.red(`${type}: An error occured on "${on}":\n${err}`);
}