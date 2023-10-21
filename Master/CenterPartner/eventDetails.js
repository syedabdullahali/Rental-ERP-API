let mongoose = require('mongoose')

let eventDetails = new mongoose.Schema({
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
empNameC:String,
employeeIDC:String,
employeeMongoId: mongoose.Schema.Types.ObjectId,
partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
centerNameC:String,
centerCodeC:String,
adminNameC:String,
createdBy:String
}, { timestamps: true })


module.exports =   mongoose.model('eventDetails', eventDetails);



