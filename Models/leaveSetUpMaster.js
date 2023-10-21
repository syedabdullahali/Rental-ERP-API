let mongoose = require('mongoose')

let leaveSetUpMaster  = new mongoose.Schema({
username:String,    
noOfLeave:String,
noOfSl:String,
noOfCl:String,
noOfPl:String,
monthYear:String,
month:Number,
year:Number,
totalLeave:Number ,
empNameC:String,
employeeIDC:String,
employeeMongoId: mongoose.Schema.Types.ObjectId,
partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
centerNameC:String,
centerCodeC:String,
adminNameC:String,
}, { timestamps: true })

module.exports =   mongoose.model('leaveSetUpMaster', leaveSetUpMaster);



