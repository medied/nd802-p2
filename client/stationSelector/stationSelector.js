import { Template } from 'meteor/templating';

import './stationSelector.html';

Template.stationSelector.onCreated(function() {
  this.subscribe('stationNames');
  Session.set("departure", "San Francisco Caltrain");
  Session.set("arrival", "Palo Alto Caltrain");
});

Template.stationSelector.helpers({
	trainStationNames() {
		var stationNames = Stops.find({
			"platform_code": "SB"
		},{
			fields: {
				"stop_name": 1
			}
		});
		return stationNames;
	}
});

Template.stationSelector.events({
	'change #departure'(event){
		Session.set("departure", event.target.value);
		console.log("Departure session var set to: ", event.target.value);
	},
	'change #arrival'(event){
		Session.set("arrival", event.target.value);
		console.log("Arrival session var set to: ", event.target.value);
	}
});