let mongoose = require('mongoose')

let eventBooking = new mongoose.Schema({
    eventName:String,
    eventBanner:String,
    hostName:String,
    service:String,
    comments:String,
    eventType:String,
    eventStartDate:Date,
    eventEndDate:Date,
    eventTime:String,
    duration:String,
    clientLimit:String,
    fess:String,
    paid:Boolean,
    eventActive:String,
    clientName:String,
    clinetId:String,
    clientAdress:String,
    clientAdress2:String,
    city:String,
    centerName:String,
    contactNumber:String,
    bookingTime:String,
    bookingStartDate:Date,
    bookingEndDate:Date,
    empNameC:String,
    employeeIDC:String,
    employeeMongoId: mongoose.Schema.Types.ObjectId,
    partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
    centerNameC:String,
    centerCodeC:String,
    adminNameC:String,
    createdBy:String,
    eventUniqID: mongoose.Schema.Types.ObjectId,
    clinetType:String,
    emailAddress:String,
    MemberId:mongoose.Schema.Types.ObjectId,
    clientFees:String
}, { timestamps: true })


module.exports =   mongoose.model('eventBooking', eventBooking);
