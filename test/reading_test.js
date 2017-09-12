  const assert = require('assert');
  const User = require('../src/user');

  describe('Reading users out of the database',()=>{
  let joe;
    
    beforeEach((done)=>{
      
      alex = new User({
        name:'Alex'
      });

       joe = new User({
       name:'Joe'
       });
       
       maria = new User ({
        name:'Maria'
       });

       zack = new User({
        name:'Zack'
       })

       Promise.all([alex.save(), joe.save(), maria.save(), zack.save()])
              .then(()=>done())

    })


     it('find all users with a name of joe',(done)=>{
         
         User.find({name:'Joe'})
             .then((users)=>{
                 
             assert(users[0]._id.toString() === joe._id.toString());
             done();
             })


     })

     it('find a user with a specific user_id',(done)=>{

          User.findOne({_id:joe._id})
              .then((user)=>{
                  
                 assert(user.name === 'Joe');

                 done();

              })
        
     })

     it.only('can skip and limit the result set',(done)=>{
        /* suppose we have alex, joe, maria, zack
           alex - skipped / [joe, maria] - limited - showed.
           Sort all my users by the name property and sort them
           in ascending order i.e. A,B,C..
           In sorting : 1 - ascending
                      : 2 - descending
           */
        User.find({})
            .sort({name:-1})
            .skip(1)
            .limit(2)
            .then((user)=>{
          
              assert(user.length === 2);
              assert(user[0].name === 'Maria');
              assert(user[1].name === 'Joe');
              done();

            })
 

     })


  })