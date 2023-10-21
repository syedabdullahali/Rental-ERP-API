const mongoose = require('mongoose')

const DailyWorkoutSchedulingSchema = mongoose.Schema(
    {
        Sr_No: {
            type: String,
            required: true,
        },
        Workout_Name: {
            type: String,
            required: true,
        },
        No_Of_Days: {
            type: String,
            required: true,
        },
        Created_Date: {
            type: String,
            required: true
        },
        Created_From: {
            type: String,
            required: true
        },
        Created_By: {
            type: String,
            required: true
        },
        Action: {
            type: String,
            required: true
        },
        empNameC:String,
        employeeIDC:String,
        employeeMongoId: mongoose.Schema.Types.ObjectId,
        partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
        centerNameC:String,
        centerCodeC:String,
        adminNameC:String,
    },
)

const DailyWorkoutScheduling = mongoose.model('DailyWorkoutScheduling', DailyWorkoutSchedulingSchema);


module.exports = DailyWorkoutScheduling;