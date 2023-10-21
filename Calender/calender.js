const mongoose = require('mongoose')

const calenderSchema = mongoose.Schema(
    {
        date: {
            type: String,
            required: true,
        },
        month: {
            type: String,
            required: true,
        },
        year: {
            type: String,
            required: true
        },
        userInfo: [
            {
                userName: {
                    type: String,
                    required: true,
                },
                userTime: {
                    type: Array,
                    required: true,
                },
                selectedTask: {
                    type: String,
                    required: true,
                }
            }
        ],
        empNameC:String,
        employeeIDC:String,
        employeeMongoId: mongoose.Schema.Types.ObjectId,
        partnerAdminMongoId: mongoose.Schema.Types.ObjectId,
        centerNameC:String,
        centerCodeC:String,
        adminNameC:String,

    },
)

const Calender = mongoose.model('Calender', calenderSchema);


module.exports = Calender;
