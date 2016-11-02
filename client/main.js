import { Template } from 'meteor/templating';

import './main.html';

Template.body.helpers({
	tripSelected() {
		if ((Session.get("departure") != "") && (Session.get("arrival") != "")) {
			Session.set("tripSelected", true);
			// console.log("tripSelected() - main: ", Session.get("tripSelected"));
			return true;
		}
	}
});