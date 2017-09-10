// Through mongoose we are creating collection model, which will 
// decide it's schema of record.
// Below code explains that the record inside the User collection will 
// follow the specific schema criteria as designed. 

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = require('./post');

const UserSchema = new Schema({

	name : {

		type : String,
    required : [true, 'Name is required'],
    validate : {

    	"validator" : (name)=> name.length > 2,
    	  "message" : 'Name must be greater than 2 characters.'
    }

	},
	likes : Number,
	posts : [PostSchema],// Nested Document
	blogPost : [{

	  type : Schema.Types.ObjectId,
    ref : 'blogPost'//name of the model.

      }]
	
 });
/*Here postCount and posts means the same but on UI side have both 
  different fields .
  So we treated postCount as virtual property which will return the 
  posts length value .
*/
UserSchema.virtual('postCount').get(function(){

 return this.posts.length;

})

const User = mongoose.model('user',UserSchema);

module.exports = User;