var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var passport = require('passport');
var User = require('../models/user');
// var csrf = require('csurf');
// var csrfProtection = csrf();
// router.use(csrfProtection);


// signin page
router.get('/signin',(req,res)=>{
    // res.render('signin',{csrfToken: req.csrfToken()});
    res.render('signin');
});

// signup page 
router.get('/signup',(req,res)=>{
    // res.render('signup',{csrfToken:req.csrfToken()});
    res.render('signup');
});


// signup handle
router.post('/signup',(req,res)=>{
    const {name, email, password ,password2 } = req.body;

    errors = [];
    if(!name || !email || !password || ! password2){
        errors.push({msg: "Please fill in fields"});
    }

    if(password!==password2){
        errors.push({msg:"Passwords do not match"});
    }

    if(password.length<4){
        errors.push({msg:"Password length should atleast 4 characters"});
    }

    if(errors.length>0){
        res.render('signup',{
            errors,
            name,
            email,
            password,
            password2
        });
    }else{
        User.findOne({email:email})
        .then(user=>{
            if(user){
                errors.push({msg:"Email is already registered."});
                res.render('signup',{
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            }else{
                const newUser = new User({
                    name,
                    email,
                    password
                    
                });

                // hash password

                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(newUser.password,salt,(err,hash)=>{
                        // set password to hash
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save((err)=>{
                            if(!err){
                                req.flash('success_msg','You are successfully registered.');
                                res.redirect('/signin');
                            }else{
                                console.log(err);
                            }
                        })

                    })
                })
                
            }
        });
    }

});


// signin handle 

router.post('/signin',(req,res,next)=>{
    
    
    passport.authenticate('local',{
        
        successRedirect:'/',
        failureRedirect:'/signin',
        failureFlash:true
    })(req,res,next);


});


// logout  handle

router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success_msg','You are successfully logged out');
    res.redirect('/'); 
});

module.exports = router;




