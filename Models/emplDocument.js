let mongoose = require('mongoose')


let emplDocument = new mongoose.Schema({
username: String,
empID:String,
empName:String,
docName:String,
docview:String,
MemBerId:String,
empNameC:String,
employeeIDC:String,
employeeMongoId: mongoose.Schema.Types.ObjectId,
partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
centerNameC:String,
centerCodeC:String,
adminNameC:String,
}, { timestamps: true })


module.exports =   mongoose.model('emplDocument', emplDocument);
