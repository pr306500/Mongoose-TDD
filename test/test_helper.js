// First step is to make mongodb server up, make it to listen at specific port.
// Now connect ur app to that server with the help of drive(mongoose)
// Once connection gets established, through mongoose we will make model. 

const mongoose = require('mongoose');
      mongoose.Promise = global.Promise;

before((done)=>{

   mongoose.connect('mongodb://localhost/users_test');
   mongoose.connection
        .once('open',()=>{
        	done();
        })
        .on('error',(err)=>{
        	console.log('Warn',err)
        })

})      

 beforeEach((done)=>{
   
   let { users, comments, blogposts } = mongoose.connection.collections
   mongoose.connecution.collections.users.drop(()=>{

 	done();

 });

 })