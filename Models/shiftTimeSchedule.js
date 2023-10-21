let mongoose = require('mongoose')

let shiftTimeSchedule = new mongoose.Schema({
     shiftName:String,
     startTime:String,
     endTime:String,
     username:String,
     centerCode:String,
     empNameC:String,
     employeeIDC:String,
     employeeMongoId: mongoose.Schema.Types.ObjectId,
     partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
     centerNameC:String,
     centerCodeC:String,
     adminNameC:String,
}, { timestamps: true })


module.exports =   mongoose.model('shiftTimeSchedule', shiftTimeSchedule);
