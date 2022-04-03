var bodyParser = require("body-parser")

const jwt = require("jsonwebtoken");
var privateKey="csfrdtfynumj447678uyueewfghjk";
require("dotenv").config()

var JWT = async (req,res,next)=>{
var token = req.headers.authorization

const user=jwt.verify(token,privateKey,function(err,decoded){
    if(err){
              res.send("invalid token")
    ;}else{
        next();
    }
})
req.user=user;
}
