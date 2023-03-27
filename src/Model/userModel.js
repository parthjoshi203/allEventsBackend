const bcrypt = require('bcrypt');
const config = require('config');
const mongoose = require('mongoose');


const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: 'email address is required',
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        const { password, ...rest } = ret;
        return rest;
      }
    }
  }
);
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const saltRounds = config.get('saltRounds');
        const salt = await bcrypt.genSalt(Number(saltRounds));
        const hashPassword = await bcrypt.hash(
            this.password,
            salt,
        );
        this.password = hashPassword;
    }
    next();
})

userSchema.methods={
    async comparePassword(password){
        const result=await bcrypt.compare(
            password,this.password,
        );
        return result;
    },
};

const userModel=model('user', userSchema);
module.exports =userModel ;
