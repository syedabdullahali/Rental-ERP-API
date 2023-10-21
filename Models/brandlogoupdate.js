let mongoose = require('mongoose')

let brandlogoupdate = new mongoose.Schema({
    username: String,
    logoId: String,
    logoImage: String,
    empNameC:String,
    employeeIDC:String,
    employeeMongoId: mongoose.Schema.Types.ObjectId,
    partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
    centerNameC:String,
    centerCodeC:String,
    adminNameC:String,
}, { timestamps: true })

module.exports = mongoose.model('brandlogoupdate', brandlogoupdate);