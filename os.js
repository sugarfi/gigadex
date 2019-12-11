const fs = require('fs');

class App {
	constructor(name) {
		this.name = name;
	}
}

class Tab {
	constructor(id, name) {
		let self = this;
		this.id = id;
		this.app = apps.find(el => el.name);
		this.register = function(name) {
			self.app = apps.get(name);
		};
	}
}

let apps = fs.readdirSync('modules');
// apps = [...apps, ...fs.readdirSync('modules/default')];
apps = apps.filter(el => el.match('.html'));
apps = apps.map(el => el.replace('.html', ''));
apps = apps.map(el => new App(el));

module.exports = {
	apps,
	App,
	Tab,
};