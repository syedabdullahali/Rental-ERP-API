const mongoose = require('mongoose')

const UpgradeCallsSchema = mongoose.Schema(
    {
        Sr_No: {
            type: String,
        },
        Date: {
            type: String,
        },
        Timing: {
            type: String,
        },
        Client_Id: {
            type: String,
        },
        Name: {
            type: String,
        },
        Contact: {
            type: String,
        },
        Service: {
            type: String,
        },
        Type_Of_Calls: {
            type: String,
        },
        Discussion: {
            type: String,
        },
        Counseller: {
            type: String,
        },
        Member_Id:{
            type:String
        },
        empNameC:String,
        employeeIDC:String,
        employeeMongoId: mongoose.Schema.Types.ObjectId,
        partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
        centerNameC:String,
        centerCodeC:String,
        adminNameC:String,

    }
)

const UpgradeCalls = mongoose.model('UpgradeCalls', UpgradeCallsSchema);


module.exports = UpgradeCalls;
