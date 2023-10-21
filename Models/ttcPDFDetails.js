
let mongoose = require('mongoose')

let ttcPDFDetails = new mongoose.Schema({

    courseName: String,
    typeOfCourse: String,
    courseLink: String,
    documentType: String,
    docName:String,
    view: String,
    empNameC:String,
    employeeIDC:String,
    employeeMongoId: mongoose.Schema.Types.ObjectId,
    partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
    centerNameC:String,
    centerCodeC:String,
    adminNameC:String,							
}, { timestamps: true })

module.exports = mongoose.model('ttcPDFDetails', ttcPDFDetails);
