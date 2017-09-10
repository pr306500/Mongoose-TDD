/*

    Very Imp Note ~ Association

    In case of twitter, an user can post many blogs(tweets), hence put in array.(One to Many)
    Now a blog can have many comments ,so put in an array.(One to many)
    Now each comment refers to a single user only, hence no need for an array.(one to one)

*/

const mongoose = require('mongoose');

const User = require('../src/user');

const Comment = require('../src/comment');

const BlogPost = require('../src/blogPost');

const assert = require('assert');
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

    blogPost = new BlogPost({
      
      title : 'JS is Great',
      content : 'Yep it is real'

    });

    comment = new Comment({

    	content : 'congrates on great post'
    })

    joe.blogPost.push(blogPost);// blogpost has been pushed 
    blogPost.comments.push(comment);
    comment.user = joe;

    Promise.all([joe.save(),blogPost.save(), comment.save()]).then(()=>done())
    //It is used to execute the async all together.
 });

 it('saves a relation between user and a blogPost',(done)=>{
  //this.setTimeout('5000');
  User.findOne({'name' : 'joe'})
      .populate('blogPost')
      .then((user)=>{
        assert(user.blogPost[0].title === 'JS is Great')
        done();
      })


 })

 it('saves a full relation graph',(done)=>{

     User.findOne({name:'joe'})
         .populate({
            'path':'blogPost', //user object property named 'blogPost'
            'populate':{       //We want to further go inside there & attempt to load up additional Association.
               'path':'comments',
               'model':'comment',//As it's not the part of the User schema hence we need to mention the model name (mongoose.model) also .
               'populate':{
                 'path': 'user',
                 'model':'user'
               }  
            }
         })
         .then((user)=>{
            assert(user.name === 'joe');
            assert(user.blogPost[0].title === 'JS is Great');
            assert(user.blogPost[0].comments[0].content === 'congrates on great post');
            assert(user.blogPost[0].comments[0].user.name === 'joe');

            done();
         })

    })


})