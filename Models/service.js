
let mongoose = require('mongoose')

let service = new mongoose.Schema({
    username: String,
    ServiceName: String,
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

module.exports = mongoose.model('service', service);