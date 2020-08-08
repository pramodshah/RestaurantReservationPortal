var localStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var User = require('../models/user');


module.exports = function(passport){ 
    
    passport.use(
        new localStrategy({usernameField:'email'},(email,password,done)=>{
            // match user
            User.findOne({email:email})
                .then(user=>{
                if(!user){
                    return done(null,false,{message:"Email is not registered,"});
                }

                // match password

                bcrypt.compare(password,user.password,(err,isMatch)=>{
                    if(err) throw err;

                    if(isMatch){
                        return done(null,user);
                    }else{
                        return done(null,false,{message:'Password Incorrect'});
                    }
                })
                
            });
        })
    );
    passport.serializeUser((user,done)=>{
        done(null,user.id);
    });

    passport.deserializeUser((id,done)=>{
        User.findById(id,(err,user)=>{
            done(err,user);
        })
    });
    
}