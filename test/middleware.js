const mongoose = require('mongoose');

const User = require('../src/user');

const BlogPost = require('../src/blogPost');

const assert = require('assert');


describe('Middleware',()=>{

 let joe,blogPost;

	beforeEach((done)=>{

    joe = new User({
    	name : 'joe'
    });

    blogPost = new BlogPost({
      
      title : 'JS is Great',
      content : 'Yep it is real'

    });

    joe.blogPost.push(blogPost);// blogpost has been pushed 

    Promise.all([joe.save(),blogPost.save()]).then(()=>done())
    //It is used to execute the async all together.
 });

  it('users clean up dangling blogposts on remove',(done)=>{

  	joe.remove()
  	   .then(()=>BlogPost.count())
  	   .then((count)=>{
  	   	assert(count === 0);
  	   	done();
  	   })

  })

})