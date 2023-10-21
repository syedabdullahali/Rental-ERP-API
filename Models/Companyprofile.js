let mongoose = require('mongoose')

let CompanyProfile = new mongoose.Schema({
    username: String,
    brandName: String,
    brandNumber: Number,
    emailAddress: String,
    areaSequerFit: String,
    currency: String,
    businessCategory: String,
    brandFullAddress: String,
    city: String,
    state: String,
    openingTime: String,
    closingTime: String,
    workingDays: String,
    halfDay: String,
    holidays: String,
    empNameC:String,
    employeeIDC:String,
    employeeMongoId: mongoose.Schema.Types.ObjectId,
    partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
    centerNameC:String,
    centerCodeC:String,
    adminNameC:String,
}, { timestamps: true })

module.exports = mongoose.model('CompanyProfile', CompanyProfile);