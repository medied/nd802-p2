import { Template } from 'meteor/templating';

import './main.html';

Template.body.helpers({
	tripSelected() {
		if ((Session.get("departure") != "") && (Session.get("arrival") != "")) {
			Session.set("tripSelected", true);
			return true;
		}
	}
});