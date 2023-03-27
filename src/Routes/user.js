const express = require('express');
const passport = require('passport');

const UserController=require('../Controller/users.controller');

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/google',passport.authenticate('google'));
router.get('/google/callback',passport.authenticate('google'),(req,res)=>{ res.send('success');});

module.exports = router;
