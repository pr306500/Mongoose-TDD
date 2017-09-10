const assert = require('assert');
const User = require('../src/user');


describe('Delete a User',()=>{
let joe;

beforeEach((done)=>{

  joe = new User({
    
    name:'Joe'

  })

  joe.save()
     .then(()=>{
       if(!joe.isNew){
           
           done()

       }
      
    })

})

it('model instance remove',(done)=>{
/*In model instance we don't pass any argument. 
  Becoz here joe represents the single document
  that's why no need to pass any argument.
*/
 joe.remove()
    .then(()=>User.findOne({name:'Joe'}))
    .then((user)=>{
    	assert(user === null);
    	done();
    })

})


it('class method remove',(done)=>{

// Remove the bunch of records with some given criteria
/*In class method we put argument
  becoz we cannot remove the entire collection.
*/
  User.remove({name:'Joe'})
      .then(()=>User.findOne({name:'Joe'}))
      .then((user)=>{
      	assert(user === null);
      	done()
      })

})

it('class method findOneAndRemove',(done)=>{

// Remove the bunch of records with some given criteria

  User.findOneAndRemove({name:'Joe'})
      .then(()=>User.findOne({name:'Joe'}))
      .then((user)=>{
      	assert(user === null);
      	done()
      })

})

it('class method findByIdAndRemove',(done)=>{

// Remove the bunch of records with some given criteria.
// In this we directly pass the id not the object literal.

  User.findByIdAndRemove(joe._id) // id will be taken from joe instance or record.
      .then(()=>User.findOne({name:'Joe'}))
      .then((user)=>{
      	assert(user === null);
      	done()
      })

 })


})