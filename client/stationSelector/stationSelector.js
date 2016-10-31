import { Template } from 'meteor/templating';

import './stationSelector.html';

Template.stationSelector.onCreated(function() {
  this.subscribe('stationNames');
  Session.set("departure", "");
  Session.set("arrival", "");
});

Template.stationSelector.helpers({
	trainStationNames() {
		return Stops.find({});
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