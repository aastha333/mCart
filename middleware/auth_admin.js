var bodyParser = require("body-parser")

const jwt = require("jsonwebtoken");
var privateKey="csfrdtfynumj447678uyueewfgihiacdsz";
require("dotenv").config()

var JWT = async (req,res,next)=>{
var token = req.headers.authorization

jwt.verify(token,privateKey,function(err,decoded){
    if(err){
              res.send("invalid token")
    ;}else{
        //const { id } = decoded
        //req.admin = { id }
        req.admin = decoded.id;
        next();
    }
})
}
module.exports={JWT}