Times = new Meteor.Collection('times');

TimesSchema = new SimpleSchema({
	"pickup_type": {
		type: String,
		optional: true
	},
	"arrival_time": {
		type: String
	},
	"stop_sequence": {
		type: String,
		optional: true
	},
	"stop_id": {
		type: String,
		optional: true
	},
	"drop_off_type": {
		type: String,
		optional: true
	},
	"trip_id": {
		type: String
	},
	"departure_time": {
		type: String
	}
});

Times.attachSchema( TimesSchema );