const mongoose = require('mongoose')

const salesTargetSchema = mongoose.Schema(
    {
        Sr_No:{
            type: String,
            required:true
        },
        Year:{
            type: String,
            required:true
        },
        Employee:{
            type:String,
            required:[true,"Please enter a employee name"],
        },
        Target:{
            type:Number,
            required:true
        },
        New_Sales:{
            type: String,
            required:true
        },
        Renewals:{
            type: Number,
            required:true
        },
        Upgrade_Sales:{
            type: Number,
            required:true
        },
        Cross_Sales:{
            type: Number,
            required:true
        },
        Balance_Collection:{
            type: Number,
            required:true
        },
        Total_Collected:{
            type: Number,
            required:true
        },
        Achived:{
            type: String,
            required:true
        },
        annualTarget:[
                {
                    monthName:{
                        type: String,
                        required:true
                    },
                    Target:{    
                        type: String,
                        required:true
                    }
                }
                
            ],
            empNameC:String,
            employeeIDC:String,
            employeeMongoId: mongoose.Schema.Types.ObjectId,
            partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
            centerNameC:String,
            centerCodeC:String,
            adminNameC:String,
    },
    
)

const SalesTarget = mongoose.model('SalesTarget',salesTargetSchema);


module.exports = SalesTarget;