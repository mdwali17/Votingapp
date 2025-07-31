const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
 // define the user schema
 const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true

    },
    age:{
        type:Number,
        require:true
    },
    email:{
        type:String
    },
    mobile:{
        type:String
    },
    address:{
        type:String,
        require:true
    },
    adharCardNumber:{
        type:Number,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'voter'
    },
    isVoted:{
        type:Boolean,
        default:false
    }
 });

 userSchema.pre('save',async function(next){
    const user=this;
    // hash the password only if it has been modified (or is new)
    if(!user.isModified('password')) return next();
    try {
        // hash password generatation
        const salt=await bcrypt.genSalt(10);

        // hash password
        const hashedpassword=await bcrypt.hash(user.password,salt);

        // override the plain password with the hashed one
        user.password=hashedpassword;
        next();
    } catch (err) {
        return next(err)
    }
})

userSchema.methods.comparePassword=async function(candidatePassword){
    try {
        // use bcrypt to compare the provide password with the hashed password
        const isMatch=await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    } catch (err) {
        throw err;
    }
}

 // create user model
 const user=mongoose.model('user',userSchema)
 module.exports=user