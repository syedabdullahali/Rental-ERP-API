let mongoose = require('mongoose')

let expenseMaster = new mongoose.Schema({
    username: String,
    CategoryName: String,
    ApprovalLevel1: String,
    ApprovalLevel2: String,
    empNameC:String,
    employeeIDC:String,
    employeeMongoId: mongoose.Schema.Types.ObjectId,
    partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
    centerNameC:String,
    centerCodeC:String,
    adminNameC:String,
}, { timestamps: true })

module.exports = mongoose.model('expenseMaster', expenseMaster);
