
let mongoose = require('mongoose')

let trainerSalarySlip = new mongoose.Schema({
    username: String,
    date:String,
    trainerName:String,   
    prHourSalary:Number,
    totalWorkingHours:Number,
    amount:Number,
    tds:Number,
    pt:Number,
    advDec:Number,
    modeOfPayment:String,
    totalAmount:Number,
    netSalary:Number,
    trainerId:String,
    empNameC:String,
    employeeIDC:String,
    employeeMongoId: mongoose.Schema.Types.ObjectId,
    partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
    centerNameC:String,
    centerCodeC:String,
    adminNameC:String,
    designation:String,
    location:String,
    Department:String,
    bankAccountNo:String,
    EmpId:String,
    Pf:String,
    ctc:String,
    remark:String,
    joiningDate:String,
    Gender:String,
    typeOfJobTimeing:String,
    incentive:Number
}, { timestamps: true })

module.exports = mongoose.model('trainerSalarySlip', trainerSalarySlip);
