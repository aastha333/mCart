const express=require('express');
const router=express.Router();
// const mongoose=require('mongoose');
//const {User,ObjectId}=require('../model/user');
//const auth = require("../middleware/auth")
//const {Payment,ObjectPaymentId} =require('../model/payment');
//const {Product,ObjectId}=require('../model/product');
const admin=require('../controller/superAdmin');
const bodyparser=require('body-parser');
const jsonEncoder=bodyparser.json();

router.post('/addAdmin',jsonEncoder,admin.addAdmin);
router.post('/loginAdmin',jsonEncoder,admin.loginAdmin);
router.put('/updateAdmin',jsonEncoder,admin.updateAdmin);
router.delete('/deleteAdmin',jsonEncoder,admin.deleteAdmin);

module.exports=router;