const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    
    title : String

})
/* We are not using mongoose.model becoz we
   don't want to create a new model and hence 
   represents the sub / nested documents.
*/
module.exports = PostSchema;
