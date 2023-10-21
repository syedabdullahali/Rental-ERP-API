const mongoose = require('mongoose')

const DietPlanTemplateSchema = mongoose.Schema(
    {
        Sr_No: {
            type: String,
            required: true,
        },
        Diet_Plan_Name: {
            type: String,
            required: true,
        },
        Diet_Duration: {
            type: String,
            required: true,
        },
        Format: {
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

const DietPlanTemplate = mongoose.model('DietPlanTemplate', DietPlanTemplateSchema);


module.exports = DietPlanTemplate;