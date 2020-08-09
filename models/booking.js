var mongoose = require('mongoose');
var BookingSchema = new mongoose.Schema({
    time:{
        type:String,
        requied:true
    },
     name:{
         type:String,
         required:true
     },
     mobile:{
         type:String,
         required:true
     },
     person:{
         type:String,
         required:true
     },
     table:{
         type:String,
         required:true
     },

     Date:{
         type:Date,
         default:Date.now

     }
});
var Booking = mongoose.model('Booking',BookingSchema);
module.exports = Booking;