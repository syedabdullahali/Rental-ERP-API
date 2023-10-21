let mongoose = require('mongoose')

let templateMaster = new mongoose.Schema({
    username: String,
    templateName: String,
    content: String,
    Status: Boolean,
    empNameC:String,
    employeeIDC:String,
    employeeMongoId: mongoose.Schema.Types.ObjectId,
    partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
    centerNameC:String,
    centerCodeC:String,
    adminNameC:String,
}, { timestamps: true })

module.exports = mongoose.model('templateMaster', templateMaster);
