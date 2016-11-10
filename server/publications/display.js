Meteor.publish('tripInfo', function() {	
	var tripInfo = Times.find({}, {
		fields: {
			"arrival_time": 1,
			"departure_time": 1,
			"stop_id": 1,
			"trip_id": 1
		}
	})

	return tripInfo

});