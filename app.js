var express = require("express");
var path = require('path');
var bodyparser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var passport = require('passport');
var cookieparser = require('cookie-parser');

var app = express();


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended:false
}));

app.use(cookieparser());


// view engine

app.set("view engine","ejs");
app.use(express.static("public")); 
app.use(expressLayouts);



// routes
app.use('/',require('./routes/index'));
app.use('/',require('./users/user'));

// database connection

var uri = 'mongodb://localhost:27017/restaurant';
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(!err){
        console.log("Successfully connected to MongoDB.");
    }else{
        console.log(err);
    }
});














// server port

const PORT = process.env.PORT || 3000;
app.listen(PORT,function(req,res){
    console.log("Server runnning on port :3000");
})
