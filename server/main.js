import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  if (Stops.find().count() === 0) {
  	console.log("Stops collection is empty. Populating...");
  	var stopsJSON = {}
  	stopsJSON = JSON.parse(Assets.getText("stops.json"));
  	for (var doc in stopsJSON ) {
  		Stops.insert(stopsJSON[doc]);
  	}
  }

  if (Trips.find().count() === 0) {
  	console.log("Trips collection is empty. Populating...");
  	var tripsJSON = {}
  	tripsJSON = JSON.parse(Assets.getText("trips.json"));
  	for (var doc in tripsJSON ) {
  		Trips.insert(tripsJSON[doc]);
  	}
  }

  if (Times.find().count() === 0) {
  	console.log("Times collection is empty. Populating...");
  	var timesJSON = {}
  	timesJSON = JSON.parse(Assets.getText("times.json"));
  	for (var doc in timesJSON ) {
  		Times.insert(timesJSON[doc]);
  	}
  }
});

Meteor.publish('stationNames', function() {
	var stations = Stops.find({
		"platform_code": "SB"
	}, {
		fields: {
			"stop_name": 1
		}
	});
	return stations
});

Meteor.publish('stationsCompleteData', function() {
	return Stops.find({});
});