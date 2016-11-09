Trips = new Ground.Collection('trips');

TripsSchema = new SimpleSchema({
	"bikes_allowed": {
		type: String,
		optional: true
	},
	"route_id": {
		type: String,
		optional: true
	},
	"wheelchair_accessible": {
		type: String,
		optional: true
	},
	"direction_id": {
		type: String
	},
	"trip_headsign": {
		type: String,
		optional: true
	},
	"shape_id": {
		type: String,
		optional: true
	},
	"service_id": {
		type: String,
		optional: true
	},
	"trip_id": {
		type: String
	},
	"trip_short_name": {
		type: String
	},
});

Trips.attachSchema( TripsSchema );