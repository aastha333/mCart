const express = require('express')
const router = express.Router()
const {Admin,ObjectId} = require('../model/superAdmin')
var bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//const { find } = require('lodash')
const getAdmin = async(req,res)=>
{
    await Admin.find().then((data)=>{
        res.status(200).json({
            data
        })
    })
   
}

const addAdmin = async(req,res)=>
{
    await Admin.findOne({role:'Super Admin'}).then(async(data)=>{
        if(!data){
            bcrypt.hash(req.body.password,10,(err,hash)=>
{
    if(err)
    {
        return res.status(500).json({
            error:err
        })
    }
        else
        {
            const data = new Admin({
                name :req.body.name,
                email:req.body.email,
                role:req.body.role,
                password :hash
                })
                data.save()
                .then(result=>{
                    res.status(200).json({
                        new_data :result
                    })
                 })
                 .catch(err=>{
                     res.status(500).json({
                         error:err
                     })
                 })
        }
        })
    }
    else{
        res.json("Can't add more than one super admin")
    }

    })
}

    const loginAdmin = (req,res)=>
    {
        Admin.find({  email:req.body.email})
        .exec()
        .then(data=>
            {
                if(data.length<1)
                {
                    return res.status(401).json({
                        message: "admin not found"
                    })
                }
                else{
                    var privateKey="csfrdtfynumj447678uyueewfgihiacdsz"
                    bcrypt.compare(req.body.password,data[0].password,(err,result)=>{
                        if(!result){
                            res.status(401).json({
                                message:"password matching fail"
                            })
                        }
                        if(result)
                        {
                            const token =jwt.sign({
                                
                                id:data[0]._id,
                                
                                
                            },
                            privateKey  , 
                            {
                                expiresIn:"24h"
                            }
                            );
                            res.status(200).json({
                                id:data[0]._id,
                               
                                token:token
                            })
                        }
                    })
                }
            })
            .catch(err=>
                {
                    res.status(500).json({
                        err:err
                    })
                })
    }
    const updateAdmin = async (req, res) => {
                var pass;
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(req.body.password, 10, async function (err, hash) {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                } else {
                    pass = hash;
                    // console.log(pass)
                     await Admin.findOneAndUpdate({ _id: req.admin },
                        {
                            $set: {
                                name: req.body.name,
                                email: req.body.email,
                                password: hash,
                                role:req.body.role
                            }
                        }).then((data)=>
                        {
                            res.json({
                                status:"true",
                                code:200,
                                message:"updated successfully",
                                response:data,
                        })
                    })
                }
            })
        }) 
    }
    const deleteAdmin=async(req,res)=>{
        try{
            await Admin.findOne({_id:ObjectId(req.admin)}).then(async(data)=>{
                var Role=data.role;
                console.log(Role)
                if(Role!='Super Admin'){
                    await Admin.deleteOne({_id:ObjectId(req.admin)}).then((result)=>{
                        res.json(result)
                    })
                }
                else{
                    res.json("super admin can't be deleted")
                }
            })
        }
        catch(err){
            res.json(err)
        }
    }
    const getById=async(req,res)=>{
        await Admin.findById(req.admin,{password:0}).then((admin)=>{
            //if (err) return res.status(500).send("There was a problem finding the user.");
            if (!admin) return res.status(404).send("No user found.");
  
            res.status(200).send(admin);
        })
    }
    
module.exports = {
    getById,
    addAdmin,
    loginAdmin,
    updateAdmin,
    deleteAdmin,
    getAdmin
}