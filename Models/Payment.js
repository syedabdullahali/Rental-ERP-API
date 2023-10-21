let mongoose = require('mongoose')

let payments = new mongoose.Schema({
    purchaseDate: Date,
    nameofUser: String,
    invoiceNumber: Number,
    amount: Number,
    taxamount: Number,
    netAmount: Number,
    paid: Number,
    pendingAmount: Number,
    mode: String,
    writeoff: Boolean,
    empNameC:String,
    employeeIDC:String,
    employeeMongoId: mongoose.Schema.Types.ObjectId,
    partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
    centerNameC:String,
    centerCodeC:String,
    adminNameC:String,
}, { timestamps: true })

module.exports = mongoose.model('payments', payments);
