/* jshint esversion: 6 */
/* jshint -W027 */
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
	if (out !== undefined) {
		console.log(out);
	}
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
		case 'cd': // [cd]
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
					if (text[1][1] !== undefined) { // [cd /*]
						if (!fs.existsSync(__jnixdirname + text[1])) {
							return error('Dir does not exist', 'cd', 'File-System');
						}
						// pwd += x;
						pwd = __jnixdirname + text[1]; // Relative to root
					} else { // [cd /]
						pwd = __jnixdirname; // Root Directory
					}
					return '';
					break;
				case /\w+/g.test(text[1]): // [cd *]
					if (!fs.existsSync(pwd + '/' + text[1])) {
						return error('Dir does not exist', 'cd', 'File-System');
					}
					pwd += '/' + text[1];
					return '';
					break;
			}
			return '';
			break;
		case 'cat': // [cat]
			return getFile(pwd + '/' + text[1]);
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
			break;
	}
}

function runNodeScript(script) {
	return eval(script);
}

function runCommandFile() {

}

function parsePath(path) {
	let out = {};
	switch (true) {
		case path == undefined: // [cmd]
			out.path = home;
			break;
		case path == '..': // [cmd ..]
			out.path = pwd.split('/').slice(0, -1).join('/');
			break;
		case path[0] == '/': // [cmd /] or [cmd /*]
			if (path[1] !== undefined) { // [cmd /*]
				if (!fs.existsSync(__jnixdirname + path)) {
					out.err = error('Dir does not exist', 'cd', 'File-System');
				}
				out.path = __jnixdirname + path; // Relative to root
			} else { // [cmd /]
				out.path = __jnixdirname; // Root Directory
			}
			break;
		case /\w+/g.test(path): // [cmd *]
			if (!fs.existsSync(pwd + '/' + path)) {
				return error('Dir does not exist', 'cd', 'File-System');
			}
			out.path = path + '/' + path;
			break;
	}
	return out;
}

function getFiles(loc = pwd) { // Get files (for ls)
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

function getFile(filename) { // Get file (protected)
	if (!fs.existsSync(filename)) {
		return error('Filw does not exist', 'getFile()', 'JS');
	}
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

function error(err, on = 'Unknown', type = 'Unknown') {
	return colors.red(`${type}: An error occured on "${on}":\n${err}`);
}

// console.log(colors.red(getFile('test')));