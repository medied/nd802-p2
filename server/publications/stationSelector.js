Meteor.publish('stationNames', function() {
	var stations = Stops.find({}, {
		fields: {
			"stop_name": 1,
			"stop_id": 1,
			"platform_code": 1
		}
	});
	return stations;
});