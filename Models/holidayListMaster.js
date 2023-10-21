let mongoose = require('mongoose')

let holidayListMaster = new mongoose.Schema({
    username: String,
    Date: Date,
    Holiday: String,
    HolidayNo: String,
    Status: Boolean,
    empNameC:String,
    employeeIDC:String,
    employeeMongoId: mongoose.Schema.Types.ObjectId,
    partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
    centerNameC:String,
    centerCodeC:String,
    adminNameC:String,
}, { timestamps: true })

module.exports = mongoose.model('holidayListMaster', holidayListMaster);
