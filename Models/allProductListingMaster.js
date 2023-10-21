let mongoose = require('mongoose')

let allProductListingMaster = new mongoose.Schema({
    username: String,
    sataus: String,
    productCategory:String,
    productName:String,
    brandName:String,
    category:String,
    productPrize:String,
    ordersQty:String,
    Kg:String,
    Color:String,
    empNameC:String,
    employeeIDC:String,
    employeeMongoId: mongoose.Schema.Types.ObjectId,
    partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
    centerNameC:String,
    centerCodeC:String,
    adminNameC:String,
}, { timestamps: true })


module.exports =   mongoose.model('allProductListingMaster', allProductListingMaster);
