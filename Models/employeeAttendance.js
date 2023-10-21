
let mongoose = require('mongoose')

let employeeAttentance = new mongoose.Schema({
    EmployeeID:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'employeeForm'
     },
     employeeName: String,
     checkDate:{ tyep :Date,
        // default:  Date.now
        },
        checkIn: String,
        checkOut: String,
        status: String, // p,lp,hp,l
    // clientId:String,
    // ClientMobile: Number,
    // ServiceName: String,
    // Group: String,
    // PT: String,
    // Condcuted: String,
    // Alert: String,
    // Branch: String,
    // centerId: String,
    empNameC:String,
    employeeIDC:String,
    employeeMongoId: mongoose.Schema.Types.ObjectId,
    partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
    centerNameC:String,
    centerCodeC:String,
    adminNameC:String,

 
}, { timestamps: true })

module.exports = mongoose.model('employeeAttentance', employeeAttentance);
