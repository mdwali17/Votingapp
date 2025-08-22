const mongoose = require("mongoose");
require('dotenv').config();

// define the mongodb connection url

// const mongourl=process.env.MONGODB_LOCALURL;// replace 'mydatabase' with yuor databse name
const mongourl=process.env.MONGODB_URL;
// set up mongodb connection
mongoose.connect(mongourl,{
  // useNewUrlParser:true,
  // useUnifiedTopology:true
})

// get default connection 
// mongoose maintians a default connection object representing the mongodb connection
const db=mongoose.connection;

db.on('connected',()=>{
  console.log('connected to mongodb server');
});
db.on('error',(err)=>{
  console.log('Mongo connnection error',err);
});
db.on('disconnected',()=>{
  console.log('Mongodb disconnected');
})

// Export the database connection
module.exports=db;