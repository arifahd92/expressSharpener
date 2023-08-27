const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);
//dynamic routing
router.get("/products/:productId", shopController.getDetail)//product/anything will come inside this suppose url is products/delete , it will grab ////
//thats why if u want products/delete route then  put that route before dynamic
// get detail will be exicuted for products/anything, and "anything" can be grabbed using req.param.(dynamic url) here productId
router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart)

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;
