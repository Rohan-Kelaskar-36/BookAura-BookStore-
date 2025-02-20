import User from "../model/user.model.js";
import bcryptjs from "bcryptjs"
export const signup=async(req,res)=>{
    try {
       const  {email,password}=req.body;
       const user=await User.findOne({email})
       if(user){
        return res.status(400).json({message:"User already exists"})
       }
       const hashPassword=await bcryptjs.hash(password,10)
       const createdUser=new User({
        email:email,
        password:hashPassword,
       })
       await createdUser.save()
       res.status(201).json({message:"user created successfully"})
    } catch (error) {
       console.log("Error" +error.message) 
       res.status(500).json({message:"Internal server error"})
    }
}
export const login =async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email});
        const isMatch=await bcryptjs.compare(password,user.password)
        if(!user || !isMatch){
            return res.status(400).json({message:"Invalid username or passsword"});
        }
        else{
            res.status(200).json({message:"Login successfully",user:{
                _id:user.id,
                email:user.email
            }})
        }
    } catch (error) {
        console.log({message:"Interrnal server error"})
    }
}