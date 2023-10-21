const express = require('express');
const staffAttendance = require('../../Models/staffAttendance')
const employeeForm= require('../../Models/employeeForm')


const router = express.Router()


const toHandleAttendanceData = (allData)=>{
    const compareDate  = (startDate,breakDate)=>{
        let startDate2 = new Date(startDate)
        let breakDate2 = new Date(breakDate)

      return   (startDate2.getFullYear() === breakDate2.getFullYear()&&
      startDate2.getMonth() === breakDate2.getMonth()&&
      startDate2.getDate() === breakDate2.getDate())
    }

    const obj={
        noOfEmployee:0,
        todayAttendedEmp:[]
    }

    obj.noOfEmployee=allData[0].length

    allData[1].reduce((crr,el)=>{
        if(!crr.includes(el.staffId)  && compareDate(el.checkDate,new Date()) ){
          crr.push(el.staffId)  
          obj.todayAttendedEmp.push(el)
        } 
        return crr
    },[])
    return obj
}


router.get('/all', async function (req, res) {
    try {
        const response =  employeeForm.find({selected:'Select'})
        const response1 =  staffAttendance.find()
        const allData = await Promise.all([response,response1])
       
        return res.status(200).json(toHandleAttendanceData(allData));
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err })
    }
})

router.get('/filter-by-admin/:partnerAdminId', async function (req, res) {
    const {partnerAdminId} =  req.params

    try {
        const response =  employeeForm.find({partnerAdminMongoId: partnerAdminId,selected:'Select'})
        const response1 =  staffAttendance.find({partnerAdminMongoId: partnerAdminId})
        const allData = await Promise.all([response,response1])
        return res.status(200).json(toHandleAttendanceData(allData));
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err })
    }
})

module.exports = router