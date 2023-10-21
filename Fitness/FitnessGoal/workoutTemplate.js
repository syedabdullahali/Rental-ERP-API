const mongoose = require('mongoose')

const WorkoutTemplateSchema = mongoose.Schema(
    {
        Sr_No: {
            type: String,
            required: true,
        },
        Type_Of_Exercise: {
            type: String,
            required: true,
        },
        Exercise_Image: {
            type: String,
            required: true,
        },
        Video: {
            type: String,
            required: true,
        },
        Exercise_Name: {
            type: String,
            required: true,
        },
        Description: {
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

const WorkoutTemplate = mongoose.model('WorkoutTemplate', WorkoutTemplateSchema);


module.exports = WorkoutTemplate;