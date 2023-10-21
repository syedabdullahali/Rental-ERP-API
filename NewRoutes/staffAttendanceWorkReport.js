const express = require('express');
const staffAttendance = require('../Models/staffAttendance');
const router = express.Router()

    
function toGetHours(date1 ,date2) {

    // get total seconds between the times
    var hours = Math.abs(((new Date(date1) - new Date(date2))%86400000) / 3600000) ;
    return hours
}
 function time_convert_Minutes(hoursNum)
    { 
      let num =  (+hoursNum.toFixed(2).split('.')[1]||0)
      let hours1 = (+hoursNum.toFixed(2).split('.')[0]||0)

        let hours = Math.floor(num / 60);  
        let minutes = num % 60;
        return ((hours1+hours) ||"00") + ":" + (minutes||"00");  

   }

function handleStaffWorkReport (classReportData){
    const monthName = ['Jan','Feb','March','April','May','June',
'July','August','Sept','Oct', 'Nov', 'Dec']   

   



    const map = new Map()

    classReportData.forEach((el)=>{

            const obj ={
                Year:new Date(el.checkDate).getFullYear(),
                Month:monthName[new Date(el.checkDate).getMonth()],
                Trainer:el.trainer_name,
                TrainerId:el.trainerId,    
                totalWorkingHours:toGetHours(el.checkDate,el.checkOutDate),      
                numberOfAttended:1, 
                BatchTime:el.batch_timing,
                category:el.category     
            }

            const tyepOFClassName = el.MemberId+" "+el.batch_timing+
             " "+el.category+" Year "+(obj.Year)+" Month "+
             (obj.Month)

            if(!map.has(tyepOFClassName)){
                map.set(tyepOFClassName,obj)                    
            }else{
              const prevObj =  map.get(tyepOFClassName)
              prevObj.totalWorkingHours+=toGetHours(el.checkDate,el.checkOutDate)   
              prevObj.numberOfAttended+=obj.numberOfAttended
              map.set(tyepOFClassName,{...prevObj})                    
            }
        
    })


   const uniqObjArr = [] 
    map.forEach((el)=>{
    const hours = el.totalWorkingHours
    el.totalWorkingHours=time_convert_Minutes(hours)
    uniqObjArr.push(el)
    })

    return uniqObjArr
}

function toHandleDailyWorkReport(data){

const arr = []    

function formatTime(timeString) {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + (minute||'00') + (hour < 12 ? "AM" : "PM");
}


data.forEach((el)=>{
    const obj ={
        date:el.checkDate,
        attendanceId:el.attentanceId,
    	name:el.StaffName,
        designation:el.Designation,
        shiftTimeing:el.shiftTimeing,
        startTime:formatTime(el.shiftStartTime),
        endTime:formatTime(el.shiftEndTime),
        checkInTime:'',
       	checkOutTime:'',	
        totalworkinghour:time_convert_Minutes(toGetHours(el.checkDate,el.checkOutDate)),
        checkIn:el.checkIn,
        checkOut:el.checkOut,
        checkInstatus:el.checkInstatus,
        checkOutstatus:el.checkOutstatus
    }
    arr.push(obj)
})

return arr
}



router.get('/filter-by-employee/:employeeId', async function (req, res) {
    const employeeId = req.params.employeeId;
    try {
        const response = await staffAttendance.find({employeeMongoId: employeeId})
        return res.status(200).json(handleStaffWorkReport(response));
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.get('/filter-by-admin/:partnerAdminId', async function (req, res) {
    const partnerAdminId = req.params.partnerAdminId;
    try {
        const response = await staffAttendance.find({partnerAdminMongoId: partnerAdminId})
        return res.status(200).json(handleStaffWorkReport(response));
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.get('/dailyAttendedReport/:startDate/filter-by-employee/:employeeId', async function (req, res) {

    const employeeId = req.params.employeeId;
    const startDate = req.params.startDate
    const endDate = new Date(startDate).setDate(new Date(startDate).getDate()+1)

    try {
        const response = await staffAttendance.find({ checkDate:{$gte:new Date(startDate),$lt: endDate},employeeMongoId: employeeId,})
        return res.status(200).json(toHandleDailyWorkReport(response));
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.get('/dailyAttendedReport/:startDate/filter-by-admin/:partnerAdminId', async function (req, res) {
    const partnerAdminId = req.params.partnerAdminId;
    const startDate = req.params.startDate
    const endDate = new Date(startDate).setDate(new Date(startDate).getDate()+1)
    
    try {
        const response = await staffAttendance.find({checkDate:{$gte:new Date(startDate),$lt: endDate},partnerAdminMongoId: partnerAdminId})
        return res.status(200).json(toHandleDailyWorkReport(response));
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})



module.exports = router
