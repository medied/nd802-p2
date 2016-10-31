import { Template } from 'meteor/templating';

import './display.html';

Template.display.onCreated(function() {
  // console.log("display.onCreated()");
  this.subscribe('stationsCompleteData');
});

Template.display.helpers({
	tripSelected() {
		console.log("tripSelected() - display");

		var selectedDeparture = Session.get("departure");
		// console.log("selectedDeparture var: ", selectedDeparture);
		var selectedArrival = Session.get("arrival");
		// console.log("selectedArrival var: ", selectedArrival);

		getTripInfo(selectedDeparture, selectedArrival);

		return true;
	}
});


////////////// Helper functions //////////////

// Params: departureStopName, arrivalStopName
// Outpus departure and arrival times for the appropriate bound
function getTripInfo(departureStopName, arrivalStopName) {
	console.log("getTripInfo() invoked");
	
	// First, determine bound
	var bound = determineBound(departureStopName, arrivalStopName);
	
	// Then, retrieve stop_ids for both departure and arrival
	var departureID = determineStationID(departureStopName, bound);
	var arrivalID = determineStationID(arrivalStopName, bound);

	console.log("getTripInfo() - departureID retrieved: ", departureID);
	console.log("getTripInfo() - arrivalID retrieved: ", arrivalID);

	// Next, query the Times collection to obtain stop times for the specified trip 
	if(typeof(departureID) != "undefined" || typeof(arrivalID) != "undefined") {
		console.log("Calling stopTimesQuery()...");
		Meteor.call("stopTimesQuery", departureID, arrivalID, function(error, result) {
			if (error) {
				console.log("stopTimesQuery() callback - error: ", error);
			} else {
				console.log("stopTimesQuery() callback - result: ", result);
			}
		});
	}

	return 
}

// Params: departureStopName, arrivalStopName
// Outputs the trip direction: whether north or south bound
function determineBound(departureStopName, arrivalStopName) {
	return 'SB'
}


// Params: stopName, bound
// Outputs the stopID
function determineStationID(stopName, bound) {
	console.log("determineStationID() invoked");
	// console.log("Params: ", stopName, bound);
	var stopCursor = Stops.find({
	  "stop_name": stopName,
	  "platform_code": bound
	  },{
	  fields: {"stop_id": 1}
	});
	
	// console.log(stopCursor.fetch());
	if (stopCursor.fetch().length != 0) {
		var stopID = stopCursor.fetch()[0]["stop_id"];
	}

	return stopID;
}

// Params: can take in the stopTimesQuery() result, plus whatever else neeeded (stop names?)
// Output should be the data organized and rendered in display.html in the desired way

function displayTripInfo() {
	// TODO
	// Ideally need  to sort stop times by chronological order
}