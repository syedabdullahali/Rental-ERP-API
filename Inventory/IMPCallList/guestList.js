const mongoose = require('mongoose')

const GuestListSchema = mongoose.Schema(
    {
        username: String,
        name: String,
        mobile: String,
        email: String, 
        category: String, 
        address: String, 
        company: String,
        event: String,
        empNameC:String,
        employeeIDC:String,
        employeeMongoId: mongoose.Schema.Types.ObjectId,
        partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
        centerNameC:String,
        centerCodeC:String,
        adminNameC:String,
    },
)

const GuestList = mongoose.model('GuestList', GuestListSchema);


module.exports = GuestList;