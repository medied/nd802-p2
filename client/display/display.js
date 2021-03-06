import { Template } from 'meteor/templating';

import './display.html';

var tripInfoHandle;
var bound;

Template.display.onCreated(function () {
	Meteor.subscribe("tripInfo");
});

Template.display.helpers({
	selectedTripInfo() {
		// selectedTripInfo() reads user input and provides the appropiate trip information
		var selectedTripInfo = [];
			
		// First, establish user input stations and determine bound 
		var departureName = Session.get("departure");
		var arrivalName = Session.get("arrival");
		var bound = getBound(departureName, arrivalName);
	
		// Then, obtain statio IDs from its name and trip bound
		var departureId = getStationId(departureName, bound);
		var arrivalId = getStationId(arrivalName, bound);

		// Next, query to obtain the raw or unprocessed times data for the selected trip
		var tripTimesRaw = getTripInfo(departureId, arrivalId);			

		// Now we can process the raw data.
		// Idea is to group by trip ID so each object of the selectedTripInfo array will have 
		// trip information (arrival time, departure time, etc) per the trip ID.
		if (tripTimesRaw.length !== 0) {
			for (var i = 0; i <= tripTimesRaw.length/2 + 1; i++){
			  var currentTrip = tripTimesRaw[i]["trip_id"];
			  var outerElement = {};
			  var innerElement = [];
			  var tripMatchCount = 0;
			  for ( var j in tripTimesRaw){
			    if (tripTimesRaw[j]["trip_id"] === currentTrip){
			      tripMatchCount++;
			      var stopId = tripTimesRaw[j]["stop_id"];
			      var departureTime = tripTimesRaw[j]["departure_time"];
			      if (bound == "SB" && tripMatchCount == 1) {
			      	outerElement.departureTime = departureTime;
			      } else if (bound == "SB" && tripMatchCount == 2) {
			      	outerElement.arrivalTime = departureTime;
			      } else if (bound == "NB" && tripMatchCount == 1) {
			      	outerElement.arrivalTime = departureTime;
			      } else if (bound == "NB" && tripMatchCount == 2) {
			      	outerElement.departureTime = departureTime;
			      }
			  	}
			 	}
			 	outerElement.tripId = currentTrip;
			 	selectedTripInfo.push(outerElement);
			}	
		}
		

		// Further process to remove unnecessary info and add trip duration
		selectedTripInfo = stripDown(selectedTripInfo);
		appendDuration(selectedTripInfo);

		return selectedTripInfo;
	},
	departure(){
		return Session.get("departure");
	},
	arrival(){
		return Session.get("arrival");
	}
});


/***********
 ***********
 ***********

	Helper functions below:
		getBound()
		getStationId()
		getTripInfo()
		appendDuration()
		stripDown()

 ***********
 ***********
 ***********/

/*
 *
	getBound()
	Params: departureStopName, arrivalStopName
	Outputs the trip direction: whether north or south bound
 *
 */
function getBound(departureStopName, arrivalStopName) {
	var stationsDict = {
		"San Francisco Caltrain": 0,
		"22nd St Caltrain": 1,
		"Bayshore Caltrain": 2,
		"So. San Francisco Caltrain Station": 3,
		"San Bruno Caltrain": 4,
		"Millbrae Caltrain": 5,
		"Broadway Caltrain": 6,
		"Burlingame Caltrain": 7,
		"San Mateo Caltrain": 8,
		"Hayward Park Caltrain": 9,
		"Hillsdale Caltrain": 10,
		"Belmont Caltrain": 11,
		"San Carlos Caltrain": 12,
		"Redwood City Caltrain": 13,
		"Atherton Caltrain": 14,
		"Menlo Park Caltrain": 15,
		"Palo Alto Caltrain": 16,
		"California Ave Caltrain": 17,
		"San Antonio Caltrain": 18,
		"Mt View Caltrain": 19,
		"Sunnyvale Caltrain": 20,
		"Lawrence Caltrain": 21,
		"Santa Clara Caltrain": 22,
		"College Park Caltrain": 23,
		"San Jose Diridon Caltrain": 24,
		"Tamien Caltrain": 25,
		"Capitol Caltrain": 26,
		"Blossom Hill Caltrain": 27,
		"Morgan Hill Caltrain":28,
		"San Martin Caltrain": 29,
		"Gilroy Caltrain":30
	}
	if (stationsDict[departureStopName] < stationsDict[arrivalStopName]) {
		return "SB";
	}else if (stationsDict[departureStopName] > stationsDict[arrivalStopName]) {
		return "NB";
	}else {
		// TODO: returning SB for now so the app doesn't break
		// Think what we could do is have another template under main.html, could set a 
		// Session var here to display a select again template
		// Or simply display whatever the welcoming template is?
		// Am I abusing from Session vars though?  
		// Android app has no 'welcome'view, just shows trips directly
		// Does have a view for a 'select again' template
		return "SB";
	}
}

/*
 *
	getStationId()
	Params: stationName, bound
	Outputs the stationId for provided inputs
 *
 */
function getStationId(stationName, bound) {
	var stationIdCursor = Stops.find({
		"stop_name": stationName,
		"platform_code": bound
	},{
		fields: {
			"stop_id": 1
		}
	});

	var stationIdFetched = stationIdCursor.fetch()

	if (stationIdFetched.length !== 0) {
		var stationId = stationIdCursor.fetch()[0]["stop_id"];
	}

	return stationId;
}

/*
 *
	getTripInfo()
	Params: departureId, arrivalId
	Outputs the trip info for selected departure and arrival stations
 *
 */
function getTripInfo(departureId, arrivalId) {
	var tripInfo = [];
	if (typeof(departureId) !== "undefined" && typeof(arrivalId) !== "undefined") {
		var timesCursor = Times.find({
		$or: [
			{"stop_id": departureId},
			{"stop_id": arrivalId}
		]
		}, {
			fields: {
				"trip_id": 1,
				"stop_id": 1,
				"departure_time": 1
			}
		});

		tripInfo = timesCursor.fetch();
		return tripInfo;
	}else {
		return tripInfo;
	}	
}

/*
 *
	appendDuration()
	Params: selectedTripInfo array
	Adds a field for the duration of each trip to the provided array
 *
 */
function appendDuration(selectedTripInfo) {
	var dateHolder = "01/01/2000";
	for (trip in selectedTripInfo) {
		var departure = dateHolder + selectedTripInfo[trip]["departureTime"],
				arrival = dateHolder + selectedTripInfo[trip]["arrivalTime"];
		var duration = moment.utc(moment(arrival,"DD/MM/YYYY HH:mm:ss").diff(moment(departure,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss");

		if (duration !== "Invalid date") {
			selectedTripInfo[trip]["duration"] = duration;
		} else {
			selectedTripInfo[trip]["duration"] = "1:00:00";
		}
	}
}

/*
 *
	stripDown()
	Params: selectedTripInfo array
	Outputs the same (reduced) array without weekend trips or invalid matches
 *
 */
function stripDown(selectedTripInfo) {
	var stripped = [];
	for (trip in selectedTripInfo) {
		if (selectedTripInfo[trip]["tripId"].slice(-1) !== 'a' && selectedTripInfo[trip]["tripId"].slice(-1) !== 'u' ) {
			if (typeof(selectedTripInfo[trip]["departureTime"]) !== 'undefined' && typeof(selectedTripInfo[trip]["arrivalTime"]) !== 'undefined') {
				stripped.push(selectedTripInfo[trip]);
			}
		}
	}
	return stripped;
}