let mongoose = require('mongoose')

let budgetingMaster = new mongoose.Schema({
    username: String,
    CategoryName: String,
    BudgetYear: Date,
    Jan: Number,
    Feb: Number,
    Mar: Number,
    Apr: Number,
    May: Number,
    Jun: Number,
    Jul: Number,
    Aug: Number,
    Sep: Number,
    Oct: Number,
    Nov: Number,
    Dec: Number,
    empNameC:String,
    employeeIDC:String,
    employeeMongoId: mongoose.Schema.Types.ObjectId,
    partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
    centerNameC:String,
    centerCodeC:String,
    adminNameC:String,
}, { timestamps: true })

module.exports = mongoose.model('budgetingMaster', budgetingMaster);
