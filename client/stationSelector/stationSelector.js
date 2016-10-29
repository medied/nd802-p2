import { Template } from 'meteor/templating';

import './stationSelector.html';

Template.stationSelector.onCreated(function() {
  this.subscribe('trainStationNames');
  Session.set("departure", "San Francisco Caltrain");
  Session.set("arrival", "San Francisco Caltrain");
});

Template.stationSelector.helpers({
	trainStationNames() {
		return Stops.find({});
	}
});

Template.stationSelector.events({
	'change #departure'(event){
		console.log(typeof(event.target.value));
		Session.set("departure", event.target.value);
	},
	'change #arrival'(event){
		console.log(event.target.value);
	}
});