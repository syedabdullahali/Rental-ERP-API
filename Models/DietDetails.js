let mongoose = require('mongoose')

let DietDetails = new mongoose.Schema({
    username: String,
    DietStartDate: Date,
    diet_Id:String,
    Member_ID: String,
    Fullname: String,
    ContactNumber: Number,
    Gender: String,
    Purpose: String,
    DietEndDate: Date,
    ExpertAdvice: String,
    DietitianName: String,
    empNameC:String,
    employeeIDC:String,
    employeeMongoId: mongoose.Schema.Types.ObjectId,
    partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
    centerNameC:String,
    centerCodeC:String,
    adminNameC:String,
}, { timestamps: true })

module.exports = mongoose.model('DietDetails', DietDetails);
