let mongoose = require('mongoose')
let activeClients = new mongoose.Schema({
    MemberId: {
        type: String,
        unique: true,
    },
    Profile: String,
    Mobile: {
        type: Number,
        unique: true,
    },
    Invoice: Number,
    AttendanceId: {
        type: String,
        unique: true,
    },
    Services: [{
        type: String
    }],
    StartDate: {
        type: Date,
        default: Date.now,
    },
    Enddate: {
        type: Date,
        default: new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
    },
    CallStatus: String,
    Appointments: [{
        type: String
    }],
    Traning: String,
    Status: String,
    empNameC:String,
    employeeIDC:String,
    employeeMongoId: mongoose.Schema.Types.ObjectId,
    partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
    centerNameC:String,
    centerCodeC:String,
    adminNameC:String,
}, { timestamps: true })

module.exports = mongoose.model('activeClients', activeClients);