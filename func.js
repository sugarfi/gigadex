/* jshint esversion: 6 */
/* jshint -W027  */
/* jshint -W061 */

module.exports = {
	runNodeScript: (script) => {
		return eval(script);
	},

	runCommandFile: () => {

	},

	parsePath: (path, limit = 'none', exist = true, homePath = false) => {
		let ret = {
			path: '',
			err: false
		};
		switch (true) {
			case path == undefined: // [cmd]
				if (homePath) {
					ret.path = home;
				} else {
					ret.path = pwd;
				}
				break;
			case path == '..': // [cmd ..]
				ret.path = pwd.split('/').slice(0, -1).join('/');
				break;
			case path[0] == '/': // [cmd /] or [cmd /*]
				if (path[1] !== undefined) { // [cmd /*]
					if (!fs.existsSync(__jnixdirname + path) && exist) {
						ret.err = func.error('Path does not exist', 'parsePath');
					}
					ret.path = __jnixdirname + path; // Relative to root
				} else { // [cmd /]
					ret.path = __jnixdirname; // Root Directory
				}
				break;
			case /\w+/g.test(path): // [cmd *]
				if (!fs.existsSync(pwd + '/' + path) && exist) {
					ret.err = func.error('Path does not exist', 'parsePath');
				}
				ret.path = pwd + '/' + path;
				break;
		}
		if (limit !== 'none' && func.typeofPath(ret.path).path !== limit && !ret.err) {
			ret.err = func.error('Path is not a ' + limit, 'parsePath');
		}
		return ret;
	},

	getFiles: (loc = pwd) => { // Get files (for [ls])
		var arr = [];
		fs.readdirSync(loc).forEach(file => {
			if (fs.lstatSync(loc + '/' + file).isDirectory()) { // Color blue if dir
				arr.push(colors.blue(file));
			} else {
				arr.push(file);
			}
		});
		return arr.join('\t');
	},

	readFile: (filename) => { // Get file contents (for [cat])
		return fs.readFileSync(filename, 'utf8');
	},

	typeofPath: (path = pwd) => {
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
			ret.err = func.error('Path does not exist', 'typeofPath');
		}
		return ret;
	},

	error: (err, on = 'Unknown', type = 'Gigadex') => {
		// return colors.red(`${type}: An error occured on "${on}":\n${err}`);
		return colors.red(`${text[0]}: An error occured on "${text[1]}":\n${err}`);
	}
};