const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");
const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId;

const RegisterUser = async (req, res) => {
    try {
        console.log(req.body.email)
        let data = req.body;

        if(!data){
            return res.status(400).send({status: false, message:"Please Provide User Details To Create User"})
        }

        let {fname,lname,email,phone,password} = data
        // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
        // now we set user password to hashed password
     password = await bcrypt.hash(password, salt);

        const finalData = {
            fname,
            lname,
            email,
            phone,
            password
        }

    let UserCreated = await userModel.create(finalData)
        return res.status(201).send({status:true, message:"User Created Successfully",data:UserCreated})
    } catch (err) {
        return res.status(500).send({status: false, message:err.message})
    }
  

}

const login = async (req, res) => {
    try {
        const mEmail = req.body.email;
        const mPassword = req.body.password;
        
        let user = await userModel.findOne({ email:mEmail});
            if(user){
                const {_id,fname,password} = user
                console.log(password)
                const validPwd = await bcrypt.compare(mPassword,user.password)
                if(!validPwd){
                    return res.status(400).send({status: true, message:"Invalid Password"})
                }
                let payload = {userId: _id};
                const generatedToken = jwt.sign(payload,"LastDead",{expiresIn:"90m"})

                res.header("user-login",generatedToken)

                return res.status(200).send({status: true, message: fname + ", You have Logged In Successfully",userId: user._id,
                token: generatedToken,})
            }
            else{
                return res.status(400).send({status: false, message:"Invalid Credentials"})
            }
    } catch (error) {
        
    }
}

const getUserDetails = async (req, res) => {
    try {

        const userid = req.params.userId;
        if(!userid){
            return res.status(404).send({status: true, message:"Enter UserId to Proceed"})
        }

        const data = await userModel.findOne({_id: userid})
        if(!data) {
            return res.status(404).send({status: true, message:"User Not Found"})
        }
        return res.status(200).send({status: true, message:"Successfully fetched UserDetails", data})

    } catch (error) {
        return res.status(500).send({status: false, message:err.message})
    }
}

const updateUser = async (req, res) => {
        try {
            const userid = req.params.userId
            let checkid = ObjectId.isValid(userid);
    
            if (!checkid) {
                return res.status(400).send({ status: false, message: "Please Provide a valid userId in query params" });;
            }
            if (req.userId != req.params.userId) {
                return res.status(400).send({ status: false, msg: "you are not authorized to make changes" })
            }
            let { fname, lname, email, phone } = req.body
            let updateProfile = await userModel.findOneAndUpdate({ _id: userid }, { fname: fname, lname: lname, email: email, phone: phone }, { new: true })
            res.status(200).send({ status: true, message: "user profile update successfully", data: updateProfile })
    
     } catch (error) {
        return res.status(500).send({status: false, message:err.message})
    }
}

module.exports = {RegisterUser,login,getUserDetails,updateUser}

