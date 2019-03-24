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
	if (out !== undefined && out !== '') {
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
			hold = parsePath(text[1], 'dir');
			if (!hold.err) {
				return getFiles(hold.path);
			} else {
				return hold.err;
			}
			break;
		case 'cd': // [cd]
			hold = parsePath(text[1], 'dir');
			if (!hold.err) {
				pwd = hold.path;
				return '';
			} else {
				return hold.err;
			}
			break;
		case 'cat': // [cat]
			// return readFile(pwd + '/' + text[1]);
			hold = parsePath(text[1], 'file');
			if (!hold.err) {
				return readFile(hold.path);
			} else {
				return hold.err;
			}
			break;
		case 'mkdir': // [mkdir]
			hold = parsePath(text[1], 'none', false);
			if (!hold.err) {
				return fs.mkdirSync(hold.path);
			} else {
				return hold.err;
			}
			break;
		case 'mv': // [mv]
			holdA = parsePath(text[1], 'none');
			holdB = parsePath(text[2], 'none', false);
			if (!holdA.err && !holdB.err) {
				return fs.renameSync(holdA.path, holdB.path);
			} else {
				return holdA.err;
			}
			break;
		case 'cp': // [cp]
			holdA = parsePath(text[1], 'none');
			holdB = parsePath(text[2], 'none', false);
			if (!holdA.err && !holdB.err) {
				return fs.copyFileSync(holdA.path, holdB.path);
			} else {
				return holdA.err;
			}
			break;
		case 'rm': // [rm]
			hold = parsePath(text[1]);
			if (!hold.err) {
				return fs.unlinkSync(hold.path);
			} else {
				return hold.err;
			}
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

function parsePath(path, limit = 'none', exist = true) {
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
				if (!fs.existsSync(__jnixdirname + path) && exist) {
					ret.err = error('Path does not exist', 'parsePath', 'File-System');
				}
				ret.path = __jnixdirname + path; // Relative to root
			} else { // [cmd /]
				ret.path = __jnixdirname; // Root Directory
			}
			break;
		case /\w+/g.test(path): // [cmd *]
			if (!fs.existsSync(pwd + '/' + path) && exist) {
				ret.err = error('Path does not exist', 'parsePath', 'File-System');
			}
			ret.path = pwd + '/' + path;
			break;
	}
	if (limit !== 'none' && typeofPath(ret.path).path !== limit && !ret.err) {
		ret.err = error('Path is not a ' + limit, 'parsePath', 'File-System');
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

function error(err, on = 'Unknown', type = 'Unknown') {
	return colors.red(`${type}: An error occured on "${on}":\n${err}`);
}