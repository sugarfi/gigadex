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

cmdDB = {};
cmd = {};

function collectCommands() {
	cmdDB = JSON.parse(fs.readFileSync('os/sys/cmd/db/cmd.json'));
	for (i = 0; i < cmdDB.length; i++) {
		cmd[cmdDB.name] = fs.readFileSync(__jnixdirname + cmdDB.path + '/' + cmdDB.name);
	}
}