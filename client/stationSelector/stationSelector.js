import { Template } from 'meteor/templating';

import './stationSelector.html';

Template.stationSelector.onCreated(function() {
  this.subscribe('trainStationNames');
});

Template.stationSelector.helpers({
	trainStationNames() {
		return Stops.find({});
	}
});