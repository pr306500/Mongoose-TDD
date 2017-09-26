//Every time we instanciate the User, new recored get created
//that will contain only the 'name' property as mentioned below.
//Here 'joe' represents the new record created.

const assert = require('assert');
const User = require('../src/user');


describe('Creating records',() => {

	it('saves a user',(done) => {
        /*
           joe is the record / document created in User collection.
        */
		const joe = new User({

			name:"Pranjal"
			
		});
        /*
          joe.save() is a command of mongodb hence async
          so there are chances that before getting saved 
          to db next test case might get execute.
        */
		joe.save().then(()=>{
           /*If joe.isNew is false it means it got saved to db*/ 
           assert(!joe.isNew);
           done();

		});

	})
})

