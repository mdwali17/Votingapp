// const mongoose = require("mongoose");
// require('dotenv').config();

// // define the mongodb connection url

// const mongourl=process.env.MONGODB_LOCALURL;// replace 'mydatabase' with yuor databse name
// // const mongourl=process.env.MONGODB_URL;
// // set up mongodb connection

//  mongoose.connect(mongourl,{
//   // useNewUrlParser:true,
//   // useUnifiedTopology: true,
//   serverSelectionTimeoutMS: 10000, 
// })
// console.log(mongourl);

// // get default connection 
// // mongoose maintians a default connection object representing the mongodb connection
// const db=mongoose.connection;

// db.on('connected',()=>{
//   console.log('connected to mongodb server');
// });
// db.on('error',(err)=>{
//   console.log('Mongo connnection error',err);
// });
// db.on('disconnected',()=>{
//   console.log('Mongodb disconnected');
// })

// // Export the database connection
// module.exports=db;
require("dotenv").config();
const mongoose = require("mongoose");

const mongourl = process.env.MONGODB_URL;
const mongolocal=process.env.MONGODB_LOCALURL


const db = async () => {
  try {
    await mongoose.connect(mongourl, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    throw err;
  }
};

module.exports = db;
