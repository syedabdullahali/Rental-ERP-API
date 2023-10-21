const mongoose = require('mongoose')

const dailyExpenseSchema = mongoose.Schema(
    {
        Sr_No: {
            type: String,
        },
        Date: {
            type: Date,
        },
        Voucher_Number: {
            type: String,
        },
        Expense_Category: {
            type: String,
        },
        Details_Of_Expense: {
            type: String,
        },
        Amount: {
            type: String,
        },
        Payment_Mode: {
            type: String,
        },
        Paid_To: {
            type: String,
        },
        Approved_By: {
            type: String,
        },
        Created_By: {
            type: String,
        },
        Status: {
            type: Boolean,
        },
        empNameC:String,
        employeeIDC:String,
        employeeMongoId: mongoose.Schema.Types.ObjectId,
        partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
        centerNameC:String,
        centerCodeC:String,
        adminNameC:String
    },
)

const DailyExpense = mongoose.model('DailyExpense', dailyExpenseSchema);


module.exports = DailyExpense;