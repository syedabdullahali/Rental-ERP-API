const mongoose = require('mongoose')

const packageMasterSchema = mongoose.Schema(
    {
        Sr_No: {
            type: String,
        },
         username: {
            type: String,
        },
        Service: {
            type: String,
        },
        Variation: {
            type: String,
        },
        Package_Name: {
            type: String,
        },
        Duration: {
            type: String,
        },
        Fees: {
            type: String,
        },
        Status: {
            type: Boolean,
        },
        Action: {
            type: String,
        },
        Days: {
            type: String,
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

const PackageMasterC = mongoose.model('PackageMaster', packageMasterSchema);


module.exports = PackageMasterC;
