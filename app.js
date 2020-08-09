var express = require("express");
var path = require('path');
var bodyparser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var passport = require('passport');
var cookieparser = require('cookie-parser');
var session = require('express-session');

var app = express();




app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended:false
}));

app.use(cookieparser());

app.use(session({
    secret: 'mysupersecret',
    resave: false,
    saveUninitialized: false,
    
}));
app.use(function(req, res, next) {
   req.session.cookie.maxAge = 180 * 60 * 1000; // 3 hours
    next();
});
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// global variables
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

app.use((req, res, next)=> {
    res.locals.login = req.isAuthenticated();
    next();
});


// view engine

app.set("view engine","ejs");
app.use(express.static("public")); 
app.use(expressLayouts);



// routes
app.use('/',require('./routes/index'));
app.use('/',require('./users/user'));




// database connection

// var uri = 'mongodb://localhost:27017/restaurant';
// mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
//     if(!err){
//         console.log("Successfully connected to MongoDB.");
//     }else{
//         console.log(err);
//     }
// });


const uri = "mongodb+srv://pramodshah:Prime123$5@cluster0.npajj.mongodb.net/restaurant?retryWrites=true&w=majority";
var db = mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(!err){
        console.log("MongoDB Connected...");
    }else{
        console.log(err);
    }
});














// server port

const PORT = process.env.PORT || 3000;
app.listen(PORT,function(req,res){
    console.log("Server runnning on port :3000");
})
