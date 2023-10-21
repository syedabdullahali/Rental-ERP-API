const mongoose = require('mongoose');
let designation = new mongoose.Schema(
    {
        username: String,
        jobDesignation: String,
        department: String,
        availableVacancy: Number,
        status: Boolean,
        empNameC:String,
        employeeIDC:String,
        employeeMongoId: mongoose.Schema.Types.ObjectId,
        partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
        centerNameC:String,
        centerCodeC:String,
        adminNameC:String,
    }, { timestamps: true }
);
module.exports = mongoose.model('designations', designation);