const cryptoRandomString = require ("crypto-random-string");

const { check, validationResult } = require("express-validator");
const express = require("express");
const router = express.Router();
const auth = require("../../../../middleware/auth");
const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id':'ATY2-ZWkzRRP-f9lOYvmbP5Mal09q5AhYTxMj6meajVGaERpjtHbHq3DCEQ6wrsvKWO7IwJ-U-YgQbXf',
    'client_secret':'ECqzTkK9KC2An0mwG94-_T108q2I7M2oqsINAUYGCCxKZcMEa1IBrFwflKDEuL7Iu-1UONS_sDnxogOM'
})
//@route GET api/auth/all
//@desc Auth user by role admin.
//access private by role admin
router.post('/', async(req,res)=>{
    let api_key = '6aa42a66ab394360e85ce251e417d74';
    

    // $merchantCode = isset($_POST['merchantCode']) ? $_POST['merchantCode'] : null;
    // $amount = isset($_POST['amount']) ? $_POST['amount'] : null;
    // $merchantOrderId = isset($_POST['merchantOrderId']) ? $_POST['merchantOrderId'] : null;
    // $productDetail = isset($_POST['productDetail']) ? $_POST['productDetail'] : null;
    // $additionalParam = isset($_POST['additionalParam']) ? $_POST['additionalParam'] : null;
    // $paymentMethod = isset($_POST['paymentCode']) ? $_POST['paymentCode'] : null;
    // $resultCode = isset($_POST['resultCode']) ? $_POST['resultCode'] : null;
    // $merchantUserId = isset($_POST['merchantUserId']) ? $_POST['merchantUserId'] : null;
    // $reference = isset($_POST['reference']) ? $_POST['reference'] : null;
    // $signature = isset($_POST['signature']) ? $_POST['signature'] : null;
});

router.get('/success',async(req,res)=>{

});
router.get('/cancle',async(req,res)=>{
    res.send('Cancelled');
});

module.exports = router;

