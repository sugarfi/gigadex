const fs = require('fs');

class AppList extends Array {
	constructor(apps) {
		super();
		let self = this;
		this.data = apps;
		this.names = () => {
			return this.data.map(el => el.name);
		};
		this.get = (name) => {
			let index = self.names().indexOf(name);
			if (index !== -1) {
				return self.data[index];
			} else {
				return undefined;
			}
		};
	}
}

class App {
	constructor(name) {
		this.name = name;
	}
}

class TabList extends Array {
	constructor() {
		super();
		let self = this;
		this.data = [];
		this.ids = () => {
			return this.data.map(el => el.id);
		};
		this.get = (id) => {
			let index = self.ids().indexOf(id);
			if (index !== -1) {
				return self.data[index];
			} else {
				return undefined;
			}
		};
		this.getIndex = (id) => {
			return self.ids().indexOf(id);
		};
		this.remove = (id) => {
			console.log(self.data);
			console.log('id: ', self.getIndex(id))
			self.data.splice(self.getIndex(id), 1);
		};
	}
}

class Tab {
	constructor(id, name) {
		let self = this;
		this.id = id;
		this.app = apps.get(name);
		this.register = (name) => {
			self.app = apps.get(name);
		};
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
	App,
	Tab,
	TabList
};