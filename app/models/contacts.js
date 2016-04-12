var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var contactSchema = new Schema({
	school_id: {type: Schema.Types.ObjectId, ref: 'School'},
	type: String,
	value: String
});

module.exports = mongoose.model('Contact', contactSchema);