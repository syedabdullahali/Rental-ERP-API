const mongoose = require('mongoose')

const impCallList = mongoose.Schema(
    {
        username: String,
        name: String,
        mobile: String,
        email: String, 
        category: String, 
        address: String, 
        company: String,
        empNameC:String,
        employeeIDC:String,
        employeeMongoId: mongoose.Schema.Types.ObjectId,
        partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
        centerNameC:String,
        centerCodeC:String,
        adminNameC:String
    }
)



module.exports =  mongoose.model('impCallList',impCallList);