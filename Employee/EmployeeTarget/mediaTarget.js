const mongoose = require('mongoose')

const mediaTargetSchema = mongoose.Schema(
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
        Google_Reviews:{
            type:Number,
            required:true
        },
        Facebook:{
            type: String,
            required:true
        },
        Instagram:{
            type: String,
            required:true
        },
        Linkedin:{
            type: String,
            required:true
        },
        Justdial:{
            type: String,
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

const mediaTarget = mongoose.model('MediaTarget',mediaTargetSchema);


module.exports = mediaTarget ;