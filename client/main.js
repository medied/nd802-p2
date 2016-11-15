import { Template } from 'meteor/templating';

import './main.html';

Template.body.onCreated(function () {
	Session.set("sameStation", false);
});

Template.body.helpers({
	tripSelected() {
		if (Session.get("departure") === Session.get("arrival")){
			Session.set("sameStation", true);
			Session.set("tripSelected", false);
			return false;
		} else if ((Session.get("departure") != "") && (Session.get("arrival") != "")) {
			Session.set("tripSelected", true);
			Session.set("sameStation", false);
			return true;
		}
	},
	sameStation() {
		if (Session.get("sameStation") === true)
		return true;
	}
});