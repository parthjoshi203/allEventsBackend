const jwt =require('jsonwebtoken');
const config =require('config');
const passport = require('passport');
const UserModel=require('../Model/userModel');

const ResponseWrapper=require('../helper/responseWrapper');


class UserController{
    static register= async(req,res)=>{
        const resWrapper= new ResponseWrapper(res);
        try {
            const user=new UserModel(req.body);
            const savedUser = await user.save();
            const secretOrPrivateKey=config.get("secretOrPrivateKey");
            const accessToken=jwt.sign({...savedUser.toJSON()},secretOrPrivateKey,{expiresIn:1000*60*60*24});
            resWrapper.created({accessToken,savedUser});
        } catch (error) {
            resWrapper.internalError(error.message);
        }
    };

    static login=async(req,res,next)=>{
        passport.authenticate('local',(err,user,info)=>{
        const resWrapper=new ResponseWrapper(res);
        if(err) return resWrapper.internalError(err.message);
            if(!user){
                return resWrapper.notFound(info.message);
            }
            const accessToken=jwt.sign(
                {id:user.id,email:user.email},'secret key'
            );
            return resWrapper.ok({accessToken,user});
        })(req,res,next);
    };
}

module.exports=UserController;