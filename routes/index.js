var express = require('express');
var router = express.Router();
var {ensureAuthenticated} = require('../config/auth');
var Booking =  require('../models/booking.js');

router.get('/',(req,res)=>{
    res.render('index');
});

router.get('/booking',ensureAuthenticated,(req,res)=>{
    res.render('booking');
});


router.post('/booking',ensureAuthenticated,(req,res)=>{
    var newBooking = new Booking();
    newBooking.time= req.body.time;
    newBooking.name = req.body.name;
    newBooking.mobile = req.body.mobile;
    newBooking.person =req.body.person;
    newBooking.table = req.body.table;
    newBooking.save(err=>{
        if(!err){
            req.flash('success_msg',"You have successfully booked your table!");
            res.redirect('/view_bookings');
        }else{
            console.log(err);
        }
    });



});

router.get('/view_bookings',ensureAuthenticated,(req,res)=>{
    Booking.find({},function(err,bookings){
        res.render('viewbooking',{bookings:bookings});
    });
   
});

router.get('/edit_booking_:id',ensureAuthenticated,(req,res)=>{
    var id = req.params.id;
    
    Booking.findById(id,(function(err, booking) {
        if(err) throw err;
        res.render('editbooking',{booking:booking})
    }));
});

router.post('/update/booking',ensureAuthenticated,(req,res)=>{
    
    var BookingData ={
        name : req.body.name,
        time :req.body.time,
        mobile : req.body.mobile,
        person : req.body.person,
        table : req.body.table
    }
    
    Booking.findByIdAndUpdate(req.body.id,BookingData,function(err,booking){
        if(err) throw err;
        res.redirect('/view_bookings');
    })

    
   
});

router.get('/delete_booking_:id',ensureAuthenticated,(req,res)=>{
    var id = req.params.id;
    Booking.findByIdAndDelete(id,function(err){
        if(err) throw err;
        req.flash('success_msg',"You have successfully deleted your booking!")
        res.redirect('/view_bookings');

    });
    
});







 
module.exports = router;