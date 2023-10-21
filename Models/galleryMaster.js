let mongoose = require('mongoose')

let galleryMaster = new mongoose.Schema({
    username: String,
    date: Date,
    Name: String,
    galleryType: String,
    Description: String,
    url: String,
    image: String,
    empNameC:String,
    employeeIDC:String,
    employeeMongoId: mongoose.Schema.Types.ObjectId,
    partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
    centerNameC:String,
    centerCodeC:String,
    adminNameC:String,
}, { timestamps: true })

module.exports = mongoose.model('galleryMaster', galleryMaster);
