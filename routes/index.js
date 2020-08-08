var express = require('express');
var router = express.Router();
var {ensureAuthenticated} = require('../config/auth');

router.get('/',(req,res)=>{
    res.render('index');
});

router.get('/booking',(req,res)=>{
    res.render('booking');
});

module.exports = router;