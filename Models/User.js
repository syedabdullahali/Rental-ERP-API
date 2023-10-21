let mongoose = require('mongoose')

let Users = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: String,
    center: String,
    centerCode: String,
    status: Boolean,
    Designation:String,
    empName:String,
    empId:String,
    mobNo:Number,
    memBerId:String,
    createdBy:String,
    createrId:String,
    isAdmin:Boolean,
    isAdminPatner:Boolean,
    isEmployee:Boolean,
    packege:String,
    typeOfPartner:String,
    location:String,
    brandLogo:String,
    startDate:Date,
    expDate:Date,
    city:String,
    country:String,
    profileLogo: String,
    aboutUser:String,
    TNC:String,
    InvoiceLogo:String,
    InvoiceTitle:String,
    Address:String,
    linkInfoArr:[
        {
            linkName:String,
            link:String
        }
    ],
    superAdminUniqId:String,
    empNameC:String,
    employeeIDC:String,
    employeeMongoId: mongoose.Schema.Types.ObjectId,
    partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
    centerNameC:String,
    centerCodeC:String,
    adminNameC:String,
}, { timestamps: true })

module.exports = mongoose.model('Users', Users);
