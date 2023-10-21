let mongoose = require('mongoose')

let leadSourceMaster = new mongoose.Schema({
    username: String,
    LeadSource: String,
    Status: Boolean,
    empNameC:String,
    employeeIDC:String,
    employeeMongoId: mongoose.Schema.Types.ObjectId,
    partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
    centerNameC:String,
    centerCodeC:String,
    adminNameC:String,
}, { timestamps: true })

module.exports = mongoose.model('leadSourceMaster', leadSourceMaster);
