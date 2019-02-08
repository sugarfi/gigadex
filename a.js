const package = {
	name: "ls",
	regex: ""
};
module.exports = (handler) => {
	return 'Handler is: ' + handler;
}
module.exports.b = () => {
	return 'b is active';
}
