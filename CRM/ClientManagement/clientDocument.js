const mongoose = require('mongoose')

const clientDocument = mongoose.Schema(
    {
        date:Date,	
        name:String,	
        docType:String,
        memberId:String,
        image:String,
        empNameC:String,
        empID:String,
        staffName:String,
        employeeIDC:String,
        docUrl:String,
        employeeMongoId: mongoose.Schema.Types.ObjectId,
        partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
        centerNameC:String,
        centerCodeC:String,
        adminNameC:String,
        docName:String
    },
)


module.exports =  mongoose.model('clientDocument', clientDocument);;
