const express=require('express');
const router=express.Router();
const User=require('../models/user')
const Candidate=require('../models/candidate');
const jwtHandler=require('../jwt');
const { default: mongoose } = require('mongoose');

const checkAdminRole= async (userID)=>{
    try{
        const user=await User.findById(userID);
        if(user.role === 'admin'){
            return true;
        };
    }catch(err){
        return false;
    }
}
// Post route to add a candidate
router.post('/add',jwtHandler.authenticate, async (req,res)=>{
    try{
        if(! (await checkAdminRole(req.user._id)))
            return res.status(403).json({message:"user does have not admin role"});
        const data=req.body

        // create a nre user document using the mongoose model
        const newCanditate=new Candidate(data);

        // save the new user to the database
        const response=await newCanditate.save();
        return res.status(200).json({response:response});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})
 
router.put('/update/:candidateID',jwtHandler.authenticate,async(req,res)=>{
    try{
        if(!await checkAdminRole(req.user._id))
            return res.status(403).json({success:false, message:"user has not admin role"});
        
        const candidateID=req.params.candidateID;

        if(!mongoose.Types.ObjectId.isValid(candidateID)){
            console.log("Invalid Candidate ID");
            return res.status(400).json({success:false,error:"Invalid candidate ID format"});
        }
        const updateCandidateData=req.body;

        const response=await Candidate.findByIdAndUpdate(candidateID,updateCandidateData,{
            new:true,
            runValidators:true,
        })
    
        if(!response){
            return res.status(404).json({success:false,error:'candidate not found'});
        }
        return res.status(200).json({success:true,data:response});
    }
    catch(err){
        console.log(err);
        res.status(500).json({success:false,error:'internal server error'}); 
    }
})

//Candidate delete
router.delete('/delete/:candidateId',jwtHandler.authenticate,async(req,res)=>{
    try{
        if(!checkAdminRole(req.user._id))
            return res.status(403).json({message:"user has not admin role"});
        
        const candidateId=req.params.candidateId;

        const response=await Candidate.findByIdAndDelete(candidateId);
        if(!response){
            return res.status(403).json({error:'candidate not found'});
        }
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'}); 
    }
})

router.get('/',async(req,res)=>{
    try{
        const candidate=await Candidate.find({});
        return res.status(200).json(candidate);
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'internal server error'}); 
    }
})
router.get('/:id',async(req,res)=>{
    try{
        const candidate=await Candidate.findById(req.params.id);
        return res.status(200).json(candidate);
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'internal server error'}); 
    }
})
module.exports=router