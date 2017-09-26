const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments',()=>{

 it('can create a subdocument',(done)=>{

 	const joe = new User({

        name : 'Joe',
        posts : [{'title':'PostTitle'}] //It's an array of object, as per schema
        // the [postSchema] should be inside the array.
        //One post will insert one at a time .
 	});

 	joe.save()
 	   .then(()=> User.findOne({name : 'Joe'}))
 	   .then((user)=>{

 	   	assert (user.posts[0].title === 'PostTitle');
 	   	done();

 	   })

 })

 it('Can add subdocuments to an existing record',(done)=>{
     
     const joe = new User({
         
         name : 'Joe',
         posts : []

     });

     joe.save()
        .then(()=> User.findOne({name : 'Joe'}))
        .then((user) => {
           
           user.posts.push({'title' : 'New post'});
            return user.save();

        })
        .then(()=> User.findOne({name : 'Joe'}))
        .then((user)=>{

        	assert(user.posts[0].title === 'New post');
        	done();
        })

 })

 it('It can remove an existing subdocument',(done)=>{
    
    const joe = new User({
    	name : 'Joe',
    	posts : [{'title': 'New Title'}]
    });

    joe.save()
       .then(()=>{return  User.findOne({name : 'Joe'})})
       .then((user)=>{
       	 // remove the zeroth index of an array.
       	 user.posts[0].remove();
       	 return user.save();
       })
       .then(()=>{return User.findOne({name : 'Joe'})})
       .then((user)=>{
       
       	  assert(user.posts.length === 0);
       	  done();
       })
 })

})
