Meteor.publish('selectedTripInfo', function(selectedDepartureName, selectedArrivalName, bound) {
	
	var departureIdCursor = Stops.find({
	  "stop_name": selectedDepartureName,
	  "platform_code": bound
	  },{
	  fields: {"stop_id": 1}
	});
	var arrivalIdCursor = Stops.find({
	  "stop_name": selectedArrivalName,
	  "platform_code": bound
	  },{
	  fields: {"stop_id": 1}
	});

	var departureId = departureIdCursor.fetch()[0]["stop_id"];
	var arrivalId = arrivalIdCursor.fetch()[0]["stop_id"];

	// console.log(departureId, arrivalId);

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

	// console.log(timesCursor);

	return timesCursor;

});