var bodyParser = require("body-parser")

const jwt = require("jsonwebtoken");
var privateKey="csfrdtfynumj447678uyueewfghjk";
require("dotenv").config()

var Jwt = async (req,res,next)=>{
var token = req.headers.authorization

jwt.verify(token,privateKey,function(err,decoded){
    if(err){
              res.send("invalid token")
    ;}else{
        next();
    }
})
}