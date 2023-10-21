
let mongoose = require('mongoose')

let offer = new mongoose.Schema({
    username: String,
    ServiceName: String,
    ServiceVariation: String,
    duration: String,
    fees: Number,
    dealName: String,
    startDate: Date,
    endDate: Date,
    discount: Number,
    netfees: Number,
    status: Boolean,
    empNameC:String,
    employeeIDC:String,
    employeeMongoId: mongoose.Schema.Types.ObjectId,
    partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
    centerNameC:String,
    centerCodeC:String,
    adminNameC:String,
}, { timestamps: true })

module.exports = mongoose.model('offer', offer);

