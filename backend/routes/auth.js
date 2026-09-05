import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
const router = express.Router();

router.post('/register',async (req,res)=>{
    try{
    const {username,email, password} = req.body;
     if(!username || !email || !password){
       return res.status(401).json({
            message:"missing credentials"
        })
     }
     const user = await User.findOne({email});
     if(user){
        res.status(400).json({message:"user already exist"});
     }

     const hashedPassword = await bcrypt.hash(password,10);



     await User.create({
        username,
        email,
        password: hashedPassword
     })
     
          
     return res.status(201).json({
          message: "Account created successfully.",
          success: true,
     })
    }

    catch(error){
           console.log(error);
           res.status(500).json({message: error.message})
    }
   
     
})



router.post('/login',async(req,res)=>{
       try {
         const {email, password,username} = req.body;
         if(!email || !password){
            return res.status(401).json({message:"Fill credentials"})
         }
           
         let user = await User.findOne({email});
         if(!user){
           return res.status(400).json({message:"User doesn't exist"});
         }
         const matchPassword = await bcrypt.compare(password, user.password)
               if(!matchPassword){
                 return res.status(401).json({
                    message:"Email or password is wrong"
                 })
               }
         
        
               
               user = {
                _id : user._id,
                username,
                email,
               }

               
               const token =  jwt.sign(
                {userId: user._id},
                process.env.JWT_SECRET,
                {expiresIn:'1d'}
            )
              
       return  res.json({
        user, 
        message:"Login successfull",
        token
    })


       } catch (error) {
          console.log(error);
          res.status(401).json({message:error.message});
       }
})



export default router;