let mongoose = require('mongoose')

let centerPartner = new mongoose.Schema({

profileLogo:String,
centerName:String,
centerCode:String,
partnerName:String,
contact:Number,
typeOfPartner:String,
location:String,
city:String,
country:String,
startDate:Date,
expDate:Date,
packege:String
}, { timestamps: true })


module.exports =   mongoose.model('centerPartner', centerPartner);



