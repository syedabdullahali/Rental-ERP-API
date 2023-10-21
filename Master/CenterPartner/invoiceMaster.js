let mongoose = require('mongoose')

let invoiceMaster = new mongoose.Schema({
    TNC:String,
    InvoiceLogo:String,
    InvoiceTitle:String,
    empNameC:String,
    employeeIDC:String,
    employeeMongoId: mongoose.Schema.Types.ObjectId,
    partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
    centerNameC:String,
    centerCodeC:String,
    adminNameC:String,
}, { timestamps: true })

module.exports = mongoose.model('invoiceMaster', invoiceMaster);
