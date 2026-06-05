const express = require('express');
const app = express();
const port = 3000;
const db =require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Person=require('./models/person');

app.get('/', (req, res) => {
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