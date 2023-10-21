let mongoose = require('mongoose')

let cancelInvoiceReport = new mongoose.Schema({
    callTimeing:String,
    discussion:String,
    contact:Number,
    CountryCode:String,
    followupby:String,
    followUpDate:Date,
    username: String,
    date: Date,
    centerName: String,
    MemberId: String,
    EmployeeId:String,
    MemberName: String,
    InvoiceNo: String,
    ServiceName: String,
    ServiceVariation: String,
    PackageName: String,
    startDate: Date,
    endDate: Date,
    duration: String,
    fees: String,
    counseller: String,
    trainer: String,
    createdBy: String,
    amount: Number,
    tax: Number,
    discount: Number,
    totalAmount: Number,
    paidAmount: Number,
    pendingAmount: Number,
    paymode: String,
    writeoff: String,
    cancelledBy: String,
    reason: String,
    status: String,
    commentsofwrite:String,
    typesofdiscount:String,
    clientId:String,
    upgrade:Boolean,
    Receipts:[
        {
            RemainingAmount: {
                type: String,
                required: true
            },
            PaidAmount: {
                type: String,
                required: true
            },
            Counseller: {
                type: String,
                required: true
            },
            NewSlipDate: {
                type: String,
                required: true
            },
            Status: {
                type: Boolean,
                required: true
            },
            AfterPayremainingAmount: {
                type: String,
                required: true
            },
            SlipNo: {
                type: String,
                required: true
            },
            CasherName: {
                type: String,
                required: true
            },
            Mobile_No: {
                type: String,
                required: true
            },
            Pay_Mode: {
                type: String,
                required: true
            }
      },
      ],
    empNameC:String,
    employeeIDC:String,
    employeeMongoId: mongoose.Schema.Types.ObjectId,
    partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
    centerNameC:String,
    centerCodeC:String,
    adminNameC:String,
}, { timestamps: true })

module.exports = mongoose.model('cancelInvoiceReport', cancelInvoiceReport);
