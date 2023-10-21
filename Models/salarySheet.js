let mongoose = require('mongoose')


let salarySheet = new mongoose.Schema({
username: String,
month: String,
empId: String,
ctc:String,
joiningDate:String,
Gender:String,  
empName:String,
Location:String,  
Designations: String,
Department:String,
noOfHalfDay:String,  
basicSlarry: String,
lateMark:String,
halfday: String,
leaveDay: String,
adjustLeave:String,
TWD: String,
TPD: String,
TDS:String,
grossSalary: String,
BasicSalary:String,
incentive: String,
PT:String,  
netSalary:String,
remark: String,
advancedSalaryDedct: String,
typeOfJobTimeing:String,  
modeOfPayment:String,
employeeID:String,  
empNameC:String,
employeeIDC:String,
employeeMongoId: mongoose.Schema.Types.ObjectId,
partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
centerNameC:String,
centerCodeC:String,
adminNameC:String,
bankAcountNo:String,
}, { timestamps: true })


module.exports =   mongoose.model('salarySheet', salarySheet);
