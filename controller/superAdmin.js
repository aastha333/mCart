const express = require('express')
const router = express.Router()
const {Admin,ObjectId} = require('../model/superAdmin')
var bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//const { find } = require('lodash')
// const getAdmin = (req,res)=>
// {
//     res.status(200).json({
//         message :"user route working"
//     })
// }
const addAdmin = async(req,res)=>
{
//var salt = bcrypt.genSaltSync(10);
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
                                //name:data[0].name,
                                email:data[0].email,
                            },
                            privateKey  , 
                            {
                                expiresIn:"24h"
                            }
                            );
                            res.status(200).json({
                                email:data[0].email,
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
                     await Admin.findOneAndUpdate({ _id: req.query.adminId },
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
            await Admin.findOne({_id:ObjectId(req.query.adminId)}).then(async(data)=>{
                var Role=data.role;
                console.log(Role)
                if(Role!='Super Admin'){
                    await Admin.deleteOne({_id:ObjectId(req.query.adminId)}).then((result)=>{
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
    
module.exports = {
    //getAdmin,
    addAdmin,
    loginAdmin,
    updateAdmin,
    deleteAdmin
}