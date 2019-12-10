const fs = require('fs');

class AppList extends Array {
	constructor(apps) {
		super();
		this.data = apps;
		this.names = () => {
			return this.data.map(el => el.name);
		};
	}
}

class App {
	constructor(name) {
		this.name = name;
	}
}

let apps = fs.readdirSync('modules');
// apps = [...apps, ...fs.readdirSync('modules/default')];
apps = apps.filter(el => el.match('.html'));
apps = apps.map(el => el.replace('.html', ''));
apps = apps.map(el => new App(el));

apps = new AppList(apps);

module.exports = {
	apps,
	App
};