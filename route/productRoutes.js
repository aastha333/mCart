const express=require('express');
const router=express.Router();
const bodyparser=require('body-parser');
const jsonEncoder=bodyparser.json();
const product=require('../controller/productController');
const inventory=require('../controller/inventoryController');
const auth = require("../middleware/auth_merchant");



router.get('/getAllProduct',jsonEncoder,auth.JWT,inventory.getProduct);
router.get('/getProduct',jsonEncoder,auth.JWT,inventory.getProduct);
router.post('/addProduct',jsonEncoder,auth.JWT,product.addProduct);
router.get('/getProductByID',jsonEncoder,auth.JWT,inventory.getProductByID);
router.put('/updateProduct',jsonEncoder,auth.JWT,product.updateProduct);
router.delete('/deleteProduct',jsonEncoder,auth.JWT,product.deleteProduct);
router.get('/getProductByMerchant',jsonEncoder,auth.JWT,inventory.getProduct);

module.exports=router;