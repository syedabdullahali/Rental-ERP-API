const mongoose = require('mongoose')

const callsTargetSchema = mongoose.Schema(
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
        Call_Target:{
            type:Number,
            required:true
        },
        Follow_Ups:{
            type: String,
            required:true
        },
        Members_Call:{
            type: String,
            required:true
        },
        Total_Completed:{
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

const callsTarget = mongoose.model('CallsTarget',callsTargetSchema);


module.exports = callsTarget ;