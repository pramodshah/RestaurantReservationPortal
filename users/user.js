var express = require('express');
var router = express.Router();

router.get('/signin',(req,res)=>{
    res.render('signin');
})

router.get('/signup',(req,res)=>{
    res.render('signup'); 
})

module.exports = router;


