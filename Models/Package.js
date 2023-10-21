
let mongoose = require('mongoose')

let Package = new mongoose.Schema({
	username: String,
	Package_Name: String,
	fees: Number,
	packages: String,
	duration: String,
	status: Boolean,
	empNameC:String,
    employeeIDC:String,
    employeeMongoId: mongoose.Schema.Types.ObjectId,
    partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
    centerNameC:String,
    centerCodeC:String,
    adminNameC:String,
}, { timestamps: true })

module.exports = mongoose.model('Package', Package);

