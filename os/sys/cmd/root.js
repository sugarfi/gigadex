/* jshint esversion: 6 */
/* jshint -W027  */
/* jshint -W061 */

module.exports = {
	pwd: () => { // [pwd]
		return pwd;
	},
	ls: () => { // [ls]
		let hold;
		hold = func.parsePath(text[1], 'dir');
		if (!hold.err) {
			return func.getFiles(hold.path);
		} else {
			return hold.err;
		}
	},
	cd: () => { // [cd]
		let hold;
		hold = func.parsePath(text[1], 'dir', true, true);
		if (!hold.err) {
			pwd = hold.path;
			return '';
		} else {
			return hold.err;
		}
	},
	cat: () => { // [cat]
		let hold;
		// return readFile(pwd + '/' + text[1]);
		hold = func.parsePath(text[1], 'file');
		if (!hold.err) {
			return func.readFile(hold.path);
		} else {
			return hold.err;
		}
	},
	mkdir: () => { // [mkdir]
		let hold;
		hold = func.parsePath(text[1], 'none', false);
		if (!hold.err) {
			return fs.mkdirSync(hold.path);
		} else {
			return hold.err;
		}
	},
	mv: () => { // [mv]
		let hold;
		holdA = func.parsePath(text[1], 'none');
		holdB = func.parsePath(text[2], 'none', false);
		if (!holdA.err && !holdB.err) {
			return fs.renameSync(holdA.path, holdB.path);
		} else {
			return holdA.err;
		}
	},
	cp: () => { // [cp]
		let hold;
		holdA = func.parsePath(text[1], 'none');
		holdB = func.parsePath(text[2], 'none', false);
		if (!holdA.err && !holdB.err) {
			return fs.copyFileSync(holdA.path, holdB.path);
		} else {
			return holdA.err;
		}
	},
	rm: () => { // [rm]
		let hold;
		hold = func.parsePath(text[1]);
		if (!hold.err) {
			return fs.unlinkSync(hold.path);
		} else {
			return hold.err;
		}
		return '';
	},
	node: () => { // [node]
		let hold;
		return func.runNodeScript(text.slice(1, text.length).join(' '));
	},
	clear: () => { // [clear]
		let hold;
		return console.clear();
	},
	touch: () => { // [touch]
		let hold;
		hold = func.parsePath(text[1], 'none', false);
		if (!hold.err) {
			return fs.appendFileSync(hold.path, '', 'utf8');
		} else {
			return hold.err;
		}
	},
	default: () => {
		return colors.red
		let hold;('Command error with: ' + text.join(' '));
	}
};