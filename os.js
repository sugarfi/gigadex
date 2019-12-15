const fs = require('fs');

class App {
	constructor(name) {
		let self = this;
		this.name = name;
		this.getIcon = function () {
			let match = fs.readdirSync('modules/' + self.name).find(el => el.match(/icon\.(jpeg|jpg|gif|png|svg)/g));
			if (match) {
				return `modules/${self.name}/${match}`;
			} else {
				return 'public/assets/icons/unknown.png';
			}
		};
	}
}

class Tab {
	constructor(id, name) {
		let self = this;
		this.id = id;
		this.app = apps.find(el => el.name);
		this.register = function (name) {
			self.app = apps.get(name);
		};
	}
}

let apps = fs.readdirSync('modules');
// apps = [...apps, ...fs.readdirSync('modules/default')];
apps = apps.map(el => {
	if (fs.readdirSync('modules/' + el).find(el => el === 'index.html')) {
		return new App(el);
	}
});

module.exports = {
	apps,
	App,
	Tab,
};