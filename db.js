const mongoose = require('mongoose');

const mongoURL ='mongodb://127.0.0.1:27017/hotels'

//set up MongoDb connection
mongoose.connect(mongoURL);

//default connection object
const db=mongoose.connection;

//define event Listeners

db.on('connected',()=>{
    console.log("Connected to MongoDB server");
})

db.on('error',(err)=>{
    console.log("MongoDB connection error",err);
})

db.on('disconnected',()=>{
    console.log("MongoDB disconnected");
})

module.exports=db;