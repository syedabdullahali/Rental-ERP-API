let mongoose = require('mongoose')

let jobProfile = new mongoose.Schema({
username: String,
Designations: String,
jobProfile:String,
empNameC:String,
employeeIDC:String,
employeeMongoId: mongoose.Schema.Types.ObjectId,
partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
centerNameC:String,
centerCodeC:String,
adminNameC:String,
}, { timestamps: true })


module.exports =   mongoose.model('jobProfile', jobProfile);
