const mongoose = require('mongoose')

const tncMaster = mongoose.Schema(
    {
        title:String,
        policy:String,
        empNameC:String,
        employeeIDC:String,
        employeeMongoId: mongoose.Schema.Types.ObjectId,
        partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
        centerNameC:String,
        centerCodeC:String,
        adminNameC:String,
        
    },
)


module.exports =  mongoose.model('tncMaster', tncMaster);;
