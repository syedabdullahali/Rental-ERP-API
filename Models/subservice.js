let mongoose = require('mongoose')

let subservice = new mongoose.Schema({
    username: String,
    sub_Service_Name: String,
    selected_service: String,
    fees: Number,
    packages: String,
    duration: String,
    status: Boolean,
    empNameC:String,
    employeeIDC:String,
    employeeMongoId: mongoose.Schema.Types.ObjectId,
    partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
    centerNameC:String,
    centerCodeC:String,
    adminNameC:String,
}, { timestamps: true })

module.exports = mongoose.model('subservice', subservice);