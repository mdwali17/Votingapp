const express=require('express')
const db=require('./../VotingApp/db');
const cors=require('cors')
const app=express();
const path=require('path')
// const router=require('router')

require('dotenv').config();


const bodyParser=require('body-parser');
app.use(bodyParser.json());// req body
const PORT=process.env.PORT || 3000;

app.use(express.json());

app.use(cors({origin:'http://localhost:5173',credentials:true}))

//import the router files
const userroutes=require('./../VotingApp/routes/userRoutes');
const candidateroutes=require('./../VotingApp/routes/candidateRoutes');
const voting=require('../VotingApp/routes/Voting')
//use the routers
app.use('/user',userroutes);
app.use('/candidate',candidateroutes);
app.use('/voting',voting);
app.use('/api',userroutes);

app.use(express.static(path.join(__dirname,'../FrontEnd/dist')));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'../FrontEnd/dist/index.html'));
})

app.listen(3000,()=>{
    console.log(`server at http://localhost:${PORT}`)
})
