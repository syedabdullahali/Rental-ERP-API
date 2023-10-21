let mongoose = require('mongoose')

let empJoining = new mongoose.Schema({
username: String, 
DocumentName:String,
documentDetails:String,   
empNameC:String,
employeeIDC:String,
employeeMongoId: mongoose.Schema.Types.ObjectId,
partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
centerNameC:String,
centerCodeC:String,
adminNameC:String, 
}, { timestamps: true })

module.exports =   mongoose.model('empJoining', empJoining);
