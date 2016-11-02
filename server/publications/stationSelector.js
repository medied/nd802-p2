Meteor.publish('stationNames', function() {
	var stations = Stops.find({
		"platform_code": "SB"
	}, {
		fields: {
			"stop_name": 1
		}
	});
	return stations;
});