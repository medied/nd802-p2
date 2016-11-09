Stops = new Ground.Collection('stops');

StopsSchema = new SimpleSchema({
	"stop_lat": {
		type: String,
		optional: true
	},
	"wheelchair_boarding": {
		type: String,
		optional: true
	},
	"zone_id": {
		type:String,
		optional: true
	},
	"stop_lon": {
		type:String,
		optional: true	},
	"parent_station": {
		type:String,
		optional: true
	},
	"stop_url": {
		type:String,
		optional: true
	},
	"stop_id": {
		type:String
	},
	"stop_name": {
		type:String
	},
	"location_type": {
		type:String,
		optional: true
	},
	"platform_code": {
		type:String,
		optional: true
	},
	"stop_code": {
		type:String,
		optional: true
	}
});

Stops.attachSchema( StopsSchema );