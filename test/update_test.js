Ujnconst assert = require('assert');
const User = require('../src/user');

// joe is our server side representation, we cannot update db directly through joe.

describe('Updating records',()=>{

let joe;

beforeEach((done)=>{

   joe = new User({
   	name : 'Joe',
    likes : 0
   });

   joe.save()
      .then(()=>{
      	done();
      })

})

function assertName(operation,done){
   
   		operation
            .then(()=>User.find({}))  
		    .then((users)=>{
		     assert(users[0].name === 'Alex');

		     	done();

		     })

}

it('instance type using set and save',(done)=>{
  //Update the specific record/document in collection.
  joe.set('name','Alex')
  assertName(joe.save(),done);
     
     
})

it('A model instance can update',(done)=>{
   //Update the specific record/document in collection.
   assertName(joe.update({'name' : 'Alex'}),done);

})

it('A model class can update',(done)=>{

   assertName(User.update({'name' : 'Joe'},{name:'Alex'}),done);

})

it('A model class can update one record',(done)=>{

   assertName(User.findOneAndUpdate({'name' : 'Joe'},{name:'Alex'}),done);

})

it('A model class can update one record by id',(done)=>{

   assertName(User.findByIdAndUpdate(joe._id,{name:'Alex'}),done);

})

it('A user can have their likes increment by 1',(done)=>{

   User.update({name: 'Joe'},{$inc: {likes: 1}})
       .then(()=>User.findOne({name: 'Joe'}))
       .then((user)=>{
        
        assert(user.likes === 1);
        done();
       })

})


})