const express=require('express');
const router=express.Router();
const {merchantProfile,ObjectId}=require('../model/merchantProfile');
const {Product,ObjectProductId}=require('../model/product');
const {customerProfile,ObjectCustomerId}=require('../model/customerProfile');
//const {Address,ObjectAddressId}=require('../model/addressCustomer')
const auth = require("../middleware/auth_customer");
const bodyparser=require('body-parser');
const jsonEncoder=bodyparser.json();

//const product=require('../controller/productController');
//const profile=require('../controller/merchantController');
//const inventory=require('../controller/inventoryController');
const customer=require('../controller/customerController');
const cart=require('../controller/cartController');
 const payment=require('../controller/paymentController')

router.post('/addCustomer',jsonEncoder,customer.addCustomer);
 router.post('/loginCustomer',jsonEncoder,customer.loginCustomer);
 router.post('/verifyCustomer',jsonEncoder,customer.verifyOtp);
 router.post('/addAddress',jsonEncoder,customer.addAddress);
 router.put('/updateCustomer',jsonEncoder,customer.updateCustomer);
 router.put('/deleteAddress',jsonEncoder,customer.deleteAddress);


 router.post('/addPayment',jsonEncoder,payment.addPayment);
// router.get('/getPayment',jsonEncoder,payment.getPayment);
// router.put('/updatePayment',jsonEncoder,payment.updatePayment);
router.post('/addToCart',jsonEncoder,cart.addToCart);
router.put('/deleteFromCart',jsonEncoder,cart.deleteFromCart);
router.put('/updateQuantity',jsonEncoder,cart.updateQuantity);

module.exports=router;