const mongoose = require('mongoose');

// const notificationSchema = new mongoose.Schema({
//   message: String,
//   timestamp: { type: Date, default: Date.now },
// });

const notificationSchema = new mongoose.Schema({
      message: String,
      staffName:String,
      empLoyeeId: mongoose.Schema.Types.ObjectId,
      empLoyeeUniqId: mongoose.Schema.Types.ObjectId,
      employeeIDC:String,
      employeeMongoId: mongoose.Schema.Types.ObjectId,
      partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
      centerNameC:String,
      centerCodeC:String,
      adminNameC:String,
      timestamp: { timestamps: true },
});

module.exports = mongoose.model('notification', notificationSchema);