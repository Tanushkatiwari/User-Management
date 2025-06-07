const userModel = require("../models/userModel");
// const validation=require("./Validator");
let { isValid, isValidName,isValidEmail , isValidContact} = require("./Validator");
const mongoose =require("mongoose");


const addUser = async (req, res) => {
    try {
        const userData = req.body;

        if (Object.keys(userData).length === 0) {
            return res.status(400).json({ msg: "Bad request,No data provided" })
        }

        const { userName, userEmail, userContact, userAddress, gender, age } = userData;

        //userName validation

        if (!isValid(userName)) {
            return res.status(400).json({ msg: "user Name is required" });
        }

        if (!isValidName(userName)) {
            return res.status(400).json({ msg: "Invalid user name" })
        }

        
        if (!isValid(userEmail)) {
            return res.status(400).json({ msg: "user email is required" })
        }

        
        if (!isValidEmail(userEmail)) {
            return res.status(400).json({ msg: "Invalid user Email" })
        }

        let duplicateEmail=await userModel.findOne({userEmail})
        if(duplicateEmail){
            return res.status(400).json({msg:"Email already exist"})
        }

      if (!isValid(userContact)) {
            return res.status(400).json({ msg: "user contact is required" })
        }

      if (!isValidContact(userContact)) {
            return res.status(400).json({ msg: "Invalid user contact" })
        }

        let duplicateContact=await userModel.findOne({userContact})
        if(duplicateContact){
            return res.status(400).json({msg:"contact already exist"})
        }

                if (!isValid(userAddress)) {
            return res.status(400).json({ msg: "user address is required" })
        }


                if (!isValid(age)) {
            return res.status(400).json({ msg: "user age is required" })
        }

                if (!isValid(gender)) {
            return res.status(400).json({ msg: "user gender is required" })
        }


        let user = await userModel.create(userData);
        return res.status(201).json({ msg: "User data added successfully", user })


    } catch (error) {
        console.log(error);

        return res.status(500).json({ msg: "Internal server error" })
    }
}

//get user


const getUsers=async(req,res)=>{
    try{
        let userData=await userModel.find();
        return res.status(200).json({userData});
    }catch(error){
        console.log(error);
        return res.status(500).json({msg:"Internal server error"})
    }
}

//update user data

const updateUser=async(req,res)=>{
    try {
        let userId=req.params.id;
        let data=req.body;

        if(!mongoose.Types.ObjectId.isValid(userId)){
            return res.status(400).json({msg:"Invalid user Id"});
        }

        let {userName,userEmail,userContact,userAddress,gender,age}=data;

        //validate userName

        if(userName!==undefined){
            if(!isValid(userName)){
                return res.status(400).json({msg:"user name is required"});
            }

            if(!isValidName(userName)){
                return res.status(400).json({msg:"Invalid user name"});
            }
        }


     if(userEmail!==undefined){
            if(!isValid(userEmail)){
                return res.status(400).json({msg:"user Email is required"});
            }

            if(!isValidEmail(userEmail)){
                return res.status(400).json({msg:"Invalid user Email"});
            }
        }


        if(userContact!==undefined){
            if(!isValid(userContact)){
                return res.status(400).json({msg:"user contact is required"});
            }

            if(!isValidContact(userContact)){
                return res.status(400).json({msg:"Invalid user contact"});
            }
        }

        if(userAddress!==undefined){
            if(!isValid(userAddress)){
                return res.status(400).json({msg:"user address is required"});
            }

            if(!isValidAddress(userAddress)){
                return res.status(400).json({msg:"Invalid user address"});
            }
        }


        let update=await userModel.findByIdAndUpdate(userId,data,{new:true});
        return res.status(200).json({msg:"Internal server error"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:"Internal server error"});
    }
}

module.exports = { addUser ,getUsers,updateUser};

