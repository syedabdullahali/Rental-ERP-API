const express = require('express');
const staffAttendance = require('../Models/staffAttendance');
const router = express.Router()
//modelName

const valiDateRouteFun = require('./valiDateRouteFun')
valiDateRouteFun(router,staffAttendance)

router.get('/emp/:id', async function (req, res) {

    const {id} = req.params;

    try {
        const response = await staffAttendance.find({ staffId: id })
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})


const handleStaffReport = (response)=>{

    const data = response.filter((el)=>Boolean(el.classesId))

                const uniqObj = []


         data.forEach((el,i) => {
             if(!uniqObj.some((el2)=>el?.classesId===el2?.classesId&&el?.staffId===el2?.staffId&&
                              el2?.month===new Date(el.checkDate).getMonth()&&el2?.year===new Date(el.checkDate).getFullYear())){
                  uniqObj.push({classesId:el.classesId,staffId:el.staffId,month:new Date(el.checkDate)
                    .getMonth(),year:new Date(el.checkDate).getFullYear(),                                  
                    time:{hours:+el.totalWorkinghour.split(":")[0],mins:+el.totalWorkinghour.split(":")[1]},details:el,noOfClasses:1
                })
             }else{
               uniqObj.forEach((el2,i)=>{
                if(el?.classesId===el2?.classesId&&el?.staffId===el2?.staffId &&el2.month===new Date(el.checkDate).getMonth()&&el2.year===new Date(el.checkDate).getFullYear()){
                    el2.time.hours+=+el.totalWorkinghour.split(":")[0]
                    el2.time.mins+=+el.totalWorkinghour.split(":")[1]
                    el2.noOfClasses+=1
                }
               })
             }
           });  

           return uniqObj
}

router.get('/report/all', async function (req, res) {
    try {
        const response = await staffAttendance.find({status:'Done'})
        return res.status(200).json(handleStaffReport(response));
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})


router.get('/report/filter-by-employee/:employeeId', async function (req, res) {
    const employeeId = req.params.employeeId;
    try {
        const response = await staffAttendance.find({status:'Done',employeeMongoId: employeeId})
        return res.status(200).json(handleStaffReport(response));
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.get('/report/filter-by-admin/:partnerAdminId', async function (req, res) {
    const partnerAdminId = req.params.partnerAdminId;
    try {
        const response = await staffAttendance.find({status:'Done',partnerAdminMongoId: partnerAdminId})
        return res.status(200).json(handleStaffReport(response));
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})




router.post('/create', async (req, res) => {
    try {
        const temp = await new staffAttendance(req.body)
        const response = await temp.save();
        console.log(response);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
});

router.post('/update/:id', async (req, res) => {
    try {
        const response = await staffAttendance.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const response = await staffAttendance.findByIdAndDelete(req.params.id);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

module.exports = router
