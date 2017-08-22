const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    
    title : String

})
/* We are not using PostSchema.model becoz we
   don't want to create a new model/collection and hence 
   represents the sub / nested documents.
*/
module.exports = PostSchema;
