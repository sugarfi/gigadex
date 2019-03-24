module.exports = () => {
	hold = func.parsePath(text[1], 'dir');
	if (!hold.err) {
		return getFiles(hold.path);
	} else {
		return hold.err;
	}
};