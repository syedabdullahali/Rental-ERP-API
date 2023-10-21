let mongoose = require('mongoose')
let Document = new mongoose.Schema({
    userId: String,
    StaffName: String,
    Documenttype: String,
    UploadDocument: String,
    empNameC:String,
    employeeIDC:String,
    employeeMongoId: mongoose.Schema.Types.ObjectId,
    partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
    centerNameC:String,
    centerCodeC:String,
    adminNameC:String,
}, { timestamps: true })
module.exports = mongoose.model('documents', Document);