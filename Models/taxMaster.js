let mongoose = require('mongoose')

let taxMaster = new mongoose.Schema({
    username: String,
    Date: Date,
    TaxName: String,
    Tax: Number,
    Status: Boolean,
    empNameC:String,
    employeeIDC:String,
    employeeMongoId: mongoose.Schema.Types.ObjectId,
    partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
    centerNameC:String,
    centerCodeC:String,
    adminNameC:String,
}, { timestamps: true })

module.exports = mongoose.model('taxMaster', taxMaster);
