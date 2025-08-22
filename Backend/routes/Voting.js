const express=require('express');
const router=express.Router();
const User=require('../models/user')
const Candidate=require('../models/candidate');
const jwtHandler=require('../jwt');


router.post('/vote/:candidateId',jwtHandler.authenticate, async(req,res)=>{

    const candidateId=req.params.candidateId;
    const userID=req.user._id;

    try {
        // find the candidate document with the specified candidateID
        const candidate=await Candidate.findById(candidateId);
        if(!candidate){
            return res.status(404).json({message:'Candidate not found'});
        } 

        const user=await User.findById(userID);
        if(!user){
            return res.status(404).json({message:'User not found'});
        }
        if(user.isVoted){
            return res.status(404).json({message:'You have already voted'});
        }
        if(user.role=='admin'){
            return res.status(404).json({message:'admin is not allowed'});
        }

        //update the candidate document record the vote
        candidate.votes.push({user:userID});
        candidate.voteCount++;
        await candidate.save();

        user.isVoted=true
        await user.save();

        res.status(200).json({message:"vote record successfully"})
    } catch (err) {
        console.log(err);
        res.status(500).json({error:'internal server error'}); 
    }
})

router.get('/vote/count',async(req,res)=>{
    try{
        const candidate=await Candidate.find().sort({voteCount:'desc'});

        const voteRecord=candidate.map((data)=>{
            return{
                party:data.party,
                count:data.voteCount
            }
        })
        return res.status(200).json(voteRecord);
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

module.exports=router