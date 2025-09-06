// const express=require('express')
// const db=require('./db')
// const cors=require('cors')
// const app=express();
// const path=require('path')
// // const router=require('router')

// require('dotenv').config();


// const bodyParser=require('body-parser');
// app.use(bodyParser.json());// req body
// const PORT=process.env.PORT || 3000;

// app.use(express.json());

// app.use(cors({origin:'http://localhost:5173',credentials:true}))

// //import the router files
// const userroutes=require('./routes/userRoutes');
// const candidateroutes=require('./routes/candidateRoutes');
// const voting=require('./routes/Voting')
// //use the routers
// app.use('/user',userroutes);
// app.use('/candidate',candidateroutes);
// app.use('/voting',voting);
// // app.use('/api',userroutes);

// app.use(express.static(path.join(__dirname,'../FrontEnd/dist')));
// app.get('*',(req,res)=>{
//     res.sendFile(path.join(__dirname,'../FrontEnd/dist/index.html'));
// })


// const startServer = async () => {
//   try {
//     await db(); // yahan wait karega jab tak DB connect nahi hota
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running at http://localhost:${PORT}`);
//     });
//   } catch (err) {
//     console.error("❌ Server start failed:", err.message);
//   }
// };

// startServer();
const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: [ "https://votingapp17.netlify.app/" ], // add production domain later
  credentials: true
}));

// Import routes
const userRoutes = require("./routes/userRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const votingRoutes = require("./routes/Voting");

// Use routes
app.use("/user", userRoutes);
app.use("/candidate", candidateRoutes);
app.use("/voting", votingRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server after DB connects
const startServer = async () => {
  try {
    await db();
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server start failed:", err.message);
  }
};

startServer();
