let mongoose = require('mongoose')

let hrPolicyMaster = new mongoose.Schema({
    username: String,
    Title: String,
    Policy: String,
    empNameC:String,
    employeeIDC:String,
    employeeMongoId: mongoose.Schema.Types.ObjectId,
    partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
    centerNameC:String,
    centerCodeC:String,
    adminNameC:String,
}, { timestamps: true })

module.exports = mongoose.model('hrPolicyMaster', hrPolicyMaster);
