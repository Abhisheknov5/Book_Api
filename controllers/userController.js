const User = require("../models/user");
const bcrypt  = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";

//Signup
const signup = async(req,res)=>{
//Existing User
    const {username,email,password} = req.body;
    try{
        const existingUser = await User.findOne({email:email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }

//Hash Password
        const hashedPassword =await bcrypt.hash(password,10);
//User Creation
        const result = await User.create({
            email:email,
            password:hashedPassword,
            username: username
        }); 
//Token Generation        
        const token = jwt.sign({email:result.email,id:result._id},SECRET_KEY);
        res.status(201).json({user: result, token:token});

    }catch(error){
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
    
}
}

//Signin
const signin = async(req,res)=>{
    const {email,password} = req.body;
    try{
        const existingUser = await User.findOne({email:email});
        if(!existingUser){
            return res.status(404).json({message:"user not found"});
        }
        const matchPassword = await bcrypt.compare(password,existingUser.password);
        if(!matchPassword){
            return res.status(400).json({message:"invalid credentials"});
        }

        const token = jwt.sign({email:existingUser.email,id:existingUser._id},SECRET_KEY);
        res.status(201).json({user: existingUser, token:token});


    }catch{
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
    }
}
module.exports = { signup, signin };





