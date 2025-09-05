const express=require('express');
const router=express.Router();
const User=require('../models/user');
const jwtHandler=require('../jwt');
const { default: mongoose } = require('mongoose');

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the API!' });
  });

router.post('/signup', async (req,res)=>{
    try{
    const data=req.body

    const admUser=await User.findOne({role:'admin'});
    if(data.role =='admin' && admUser){
        return res.status(400).json({error:'An admin user already exists'});
    }
    
    if(!/^\d{12}$/.test(data.adharCardNumber)){
        return res.status(400).json({error:'user with the same adhar card number already exist'})
    }
    // create a nre user document using the mongoose model
    const newUser=new User(data);
    // save the new user to the database
    const response=await newUser.save();

    const token = jwtHandler.generate({ _id: newUser._id, email: newUser.email});
    res.status(200).json({response:response,token:token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})
//login routes
router.post('/login',async(req,res)=>{
    try {
        // extact username and password from request body 
        const {adharCardNumber,password}=req.body;
        if(!adharCardNumber || !password){
            return res.status(400).json({error:'Adhar card number and password require'})
        }

        // find the user by username
        const user=await User.findOne({adharCardNumber:adharCardNumber})

        // if user does not exist or password does not match ,return error
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({error:'invalid username or password'})
        }
        const token =jwtHandler.generate({ _id:user._id, email:user.email});
        return res.status(200).json({token})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }
})

router.get('/profile',jwtHandler.authenticate, async (req, res) => {
    try {
        const userData = req.user;
        
        // Ensure user data is present in the request
        if (!userData || !userData._id) {
            return res.status(400).json({ error: 'Invalid user data' });
        }
        // const userId = userData._id;

        const isValidObjectTd=mongoose.Types.ObjectId.isValid(userData._id);
        if (!isValidObjectTd) {
            return res.status(400).json({error:'Invalid user ID format'});
        }
        // Fetch user from the database
        const user = await User.findById(userData._id)
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const {password, ...userProfile}=user.toObject();
        return res.status(200).json({ user:userProfile });
    }
     catch (err) {
        console.error(err.message || err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/p/password',jwtHandler.authenticate,async(req,res)=>{
    try{
        const userId=req.user;//extract the id from the token 
        const {currentPassword,newPassword}=req.body;

        if(!currentPassword || !newPassword){
            return res.status(400).json({error:'both current password and new password are required'})
        }
        const user=await User.findById(userId);

        
        // if password does not match ,return error
        if (!user || !(await user.comparePassword(currentPassword))) {
            return res.status(401).json({error:'invalid username or password'})
        }
        //update password
        user.password=newPassword;
        await user.save();

        console.log("password update");
        res.status(200).json({message:"password changed"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'}); 
    }
})
module.exports=router
