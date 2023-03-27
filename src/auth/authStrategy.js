const LocalStrategy=require('passport-local').Strategy;
const passportGoogle=require('passport-google-oauth');
const User=require('../Model/userModel');

// const GoogleStrategy=passportGoogle.OAuth2Strategy;

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

// const googleAuthenticate=()=>new GoogleStrategy(
//     {
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: '/api/auth/google/callback',
//         scope: [ 'email','profile' ],
//         state: true,
//     },
//     (accessToken, refreshToken, profile,cb)=>{
//         cb(null,profile)
//     }
// )

module.exports={
    authenticate,
    // googleAuthenticate
}