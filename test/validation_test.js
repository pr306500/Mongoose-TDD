 	const assert = require('assert');

	const User = require('../src/user');


	describe('Validating Records',()=>{

	 it('requires a user name',()=>{

	   const user = new User({

	     name : undefined

	   });
       /*user.validateSync().errors.name.message*/
	   const validationResult = user.validateSync();
	   const {message} = validationResult.errors.name;

	   assert(message == 'Name is required');

	 });
   /* without saving the instance*/
	 it('requires a user\'s name longer than 2 characters',()=>{

	    const user = new User({
	         
	         name: 'Po'

	    });

	    const validationResult = user.validateSync();
	    const {message} = validationResult.errors.name;
	     
	     assert(message == 'Name must be greater than 2 characters.');

	 });
     /*After saving the instnce .*/
	 it('disallows invalid records from being inserted/save',()=>{

	 	var user = new User({
	 		name : 'KO'
	 	});

	 	user.save()
	        .catch((validationResult)=>{

	        	const {message} = validationResult.errors.name;
	            assert(message == 'Name is required');
	            done();

	        })

	 })


	})