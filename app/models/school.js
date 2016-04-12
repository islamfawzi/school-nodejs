var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SchoolSchema = new Schema({
 
   name: String,
   address: String,
   description: String

});

module.exports = mongoose.model('School', SchoolSchema);