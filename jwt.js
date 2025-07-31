const jwt=require('jsonwebtoken');
const SECRET_KEY=process.env.JWT_SECRET;

//generat token functio
function generate(user){
    return jwt.sign(
        {
            _id:user._id,
            email:user.email
        },
        SECRET_KEY,
        {expiresIn:"1h"});
}

function authenticate(req,res,next){
    const authHeader=req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(401).json({message:"Authorization token required or invalid format"});
    }
    const token=authHeader.split(' ')[1];

     jwt.verify(token,SECRET_KEY,(err,decode)=>{
        if(err){
            return res.status(401).json({message:"unauthrized access"});
        }
        req.user=decode
        next()
    });
}
module.exports = {generate,authenticate};

