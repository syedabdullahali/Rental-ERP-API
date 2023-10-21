let mongoose = require('mongoose')


let ttcVideo = new mongoose.Schema({
      courseName:String,
      formalOfVideos:String,
      sessionNo:String,
      videoLink:String,
      empNameC:String,
      employeeIDC:String,
      employeeMongoId: mongoose.Schema.Types.ObjectId,
      partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
      centerNameC:String,
      centerCodeC:String,
      adminNameC:String,
}, { timestamps: true })

module.exports =   mongoose.model('ttcVideo', ttcVideo);

