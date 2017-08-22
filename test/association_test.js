const mongoose = require('mongoose');

const User = require('../src/user');

const Comment = require('../src/comment');

const Blog = require('../src/blogPost');

/*
  
  In this we are going to associate the joe to the blogPost
  and blogpost to the comment and comment to the user.

*/


describe('Associations',()=>{

 let joe, blogPost, comment;

 beforeEach((done)=>{

    joe = new User({
    	name : 'joe'
    });

    blogPost = new Blog({
      
      title : 'JS is Great',
      content : 'Yep it is real'

    });

    comment = new Comment({

    	content : 'congrates on great post'
    })

    joe.blogPost.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    Promise.all([joe.save(),blogPost.save(), comment.save()]).then(()=>done())
    //It is used to execute the async all together.
 });

 it.only('saves a relation between user and a blogPost',()=>{
  
  User.findOne({name : 'Joe'})
      .populate('blogPost')
      .then((user)=>{
        console.log(user);
        done();
      })


 })


})