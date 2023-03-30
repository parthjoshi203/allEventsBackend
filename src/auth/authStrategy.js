const LocalStrategy=require('passport-local').Strategy;
const User=require('../Model/userModel');


const authenticate=()=>
    new LocalStrategy(
        {usernameField:'email'},
        async(email,password,next)=>{
            try{
                const user=await User.findOne({email});
                if(!user){
                    return next(null,false,{message:'user not found'});
                }
                const result=await user.comparePassword(password);
                if(!result){
                    return next (null,false,{message:'password is not valid'});
                }
                return next(null,user,{message:'login successfully...'});
            }catch(error){
                return next(error);
            }
        },
);

module.exports={
    authenticate
}