const express = require('express');
const app = express();
const port = 3000;
const db =require('./db');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;



const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Person=require('./models/person');

//authentication logic
passport.use(new LocalStrategy(async (username,password,done) => {
  try{
      console.log("receive credentials",USERNAME,PASSWORD);
      const user = await Person.findOne({username:USERNAME});
      if(!user)
          return done(null,false,{message : 'Innocrect username'});
      const isPasswordmatch = user.PASSWORD == password ?true:false;
      if(!isPasswordmatch){
          return done(null,user);
      }
      else{
         return done(null,false,{message:'Incoorect password'})
      }
  }catch(err){
      return done(err);
  }
}))

app.use(passport.initialize());


const localAuthMiddleware=passport.authenticate('local',{session: false})
app.get('/',localAuthMiddleware, (req, res) => {
  res.send('Hello World, Welcome to hotel!');
});

app.post('/person', async (req,res)=>{
    try{
    const data = req.body // assuming the req data contains the person data

    // create a new person document using the Mongoose model
    const newPerson = new Person(data);

    const response= await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        req.status(500).json({error:"Internal Server error "});
    }
   
    

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});