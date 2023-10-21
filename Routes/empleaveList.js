const express = require('express')
const router = express.Router()
//modelName
const empleaveList = require('../Models/empleaveList')
const leaveSetUpMaster = require('../Models/leaveSetUpMaster')
const employee = require('../Models/employeeForm')



const valiDateRouteFun = require('./valiDateRouteFun')
valiDateRouteFun(router, empleaveList)

const liveInfoHandleFun = (response1,response2,response3)=>{

    const empData = response1.map((el)=>{
        return  {
         empName:el.FullName,
         memBerId:el._id,
         empId:el.EmployeeID,
         leaveDetails:[
            ...response2.map((el2)=>{
                let useleave=0 

                response3.forEach(el3 => {
                    if(el2.year===el3.year&&el3.MemberId===el._id.toString()){
                         useleave+=+el3.useLeave
                    }    
            })

                return {
                    totalLeave:el2.totalLeave,
                    noOfSl:+el2.noOfSl,
                    noOfCl:+el2.noOfCl,
                    noOfPl:+el2.noOfPl,
                    year:+el2.year,
                    useleave,
                }
            })]
         }
       })

       return empData
}



router.get('/emp-leave-info/all', async function (req, res) {
    try {
        const response1 = await employee.find({selected:'Select'})
        const response2 = await leaveSetUpMaster.find()
        const response3 = await empleaveList.find()

        
    
        return res.status(200).json(liveInfoHandleFun(response1,response2,response3));
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.get('/emp-leave-info/filter-by-employee/:employeeId', async function (req, res) {
    try {
        const employeeId = req.params.employeeId;

        const response1 = await employee.find({selected:'Select',employeeMongoId: employeeId})
        const response2 = await leaveSetUpMaster.find({employeeMongoId: employeeId})
        const response3 = await empleaveList.find({employeeMongoId: employeeId})
    
        return res.status(200).json(liveInfoHandleFun(response1,response2,response3));
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})


router.get('/emp-leave-info/filter-by-admin/:partnerAdminId', async function (req, res) {
    try {
        const partnerAdminId = req.params.partnerAdminId;
        const response1 = await employee.find({selected:'Select',partnerAdminMongoId: partnerAdminId})
        const response2 = await leaveSetUpMaster.find({partnerAdminMongoId: partnerAdminId})
        const response3 = await empleaveList.find({partnerAdminMongoId: partnerAdminId})
        return res.status(200).json(liveInfoHandleFun(response1,response2,response3));
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})


router.get('/emp/:id', async function (req, res) {

    const {id} = req.params

    try {
        const response = await empleaveList.find({MemberId:id})
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.post('/create', async (req, res) => {
    try {
        const temp = await new empleaveList(req.body)
        const response = await temp.save();
        console.log(response);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
});

router.get('/:id', async function (req, res) {
    try {
        const response = await empleaveList.findById({ _id: req.params.id })
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.post('/update/:id', async (req, res) => {
    try {
        const response = await empleaveList.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const response = await empleaveList.findByIdAndDelete(req.params.id);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

module.exports = router
