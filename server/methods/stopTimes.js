Meteor.methods({
	stopTimesQuery: function(departureID, arrivalID) {
		var timesQuery = Times.aggregate([
			{$match: {
				$or: [
					{"stop_id": departureID},
		 			{"stop_id": arrivalID}
		 			]
		 		}
		 	},
			{$group: {
				_id: "$trip_id",
				stop_id: { $push: "$stop_id"},
				departure_arrival_times: { $push: "$departure_time"}
				}
			}
		]);
	return timesQuery;
	}
});