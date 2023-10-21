
let mongoose = require('mongoose')

let fitnessDetails = new mongoose.Schema({
    username: String,
    Measurement_Date: Date,
    Member_ID: String,
    ClientId:String,
    Fullname: String,
    ContactNumber: Number,
    Weight: Number,
    Height: Number,
    BMI: Number,
    Age: Number,
    Fat: Number,
    Neck: Number,
    Shoulder: Number,
    Chest: Number,
    ArmsR: Number,
    ArmsL: Number,
    ForArms: Number,
    Waist: Number,
    Hips: Number,
    ThighR: Number,
    ThighL: Number,
    CalfR: Number,
    CalfL: Number,
    Counseller: String,
    NextFollowup_Date: Date,
    empNameC:String,
    employeeIDC:String,
    employeeMongoId: mongoose.Schema.Types.ObjectId,
    partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
    centerNameC:String,
    centerCodeC:String,
    adminNameC:String,
}, { timestamps: true })

module.exports = mongoose.model('fitnessDetails', fitnessDetails);

