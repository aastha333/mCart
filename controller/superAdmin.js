const express = require('express')
const router = express.Router()
const {Admin,ObjectAdminId} = require('../model/superAdmin')
var bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const getAdmin = (req,res)=>
{
    res.status(200).json({
        message :"user route working"
    })
}
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
                    var privateKey="csfrdtfynumj447678uyueewfeacdsz"
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
module.exports = {
    getAdmin,
    addAdmin,
    loginAdmin
}