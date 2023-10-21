let mongoose = require('mongoose')

let batchCategory = new mongoose.Schema({
    date:Date,
    cateGoryName:String,
    empNameC:String,
    employeeIDC:String,
    employeeMongoId: mongoose.Schema.Types.ObjectId,
    partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
    centerNameC:String,
    centerCodeC:String,
    adminNameC:String,
}, { timestamps: true })

module.exports = mongoose.model('batchCategory', batchCategory);
