const mongoose=require('mongoose')
const Schema=mongoose.schema

const shiftTimeSchema=new mongoose.Schema({
     shiftName:{
        type:String
     },
     startTime:{
        type:Date
     },
     endTime:{
        type:Date
     },
     username:{
        type:String
     },
     centerCode:{
        type:String
     },
    empNameC:String,
    employeeIDC:String,
    employeeMongoId: mongoose.Schema.Types.ObjectId,
    partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
    centerNameC:String,
    centerCodeC:String,
    adminNameC:String,
})

const shiftTimeModel=mongoose.model('shift-time-schedule', shiftTimeSchema)
module.exports=shiftTimeModel
