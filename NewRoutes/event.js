const express = require('express');
const eventDetails = require('../Master/CenterPartner/eventDetails')
const router = express.Router()

router.post('/create', async (req, res) => {
    try {
        const temp = await new eventDetails(req.body)
        const response = await temp.save();
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
});

router.post('/update/:id', async (req, res) => {
    try {
        const response = await eventDetails.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const response = await eventDetails.findByIdAndDelete(req.params.id);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.get('/filter-by-employee/:employeeId', async function (req, res) {
    const employeeId = req.params.employeeId;
    try {
        const response = await eventDetails.find({ employeeMongoId: employeeId})
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.get('/filter-by-admin/:partnerAdminId', async function (req, res) {
    const partnerAdminId = req.params.partnerAdminId;
    try {
        const response = await eventDetails.find({partnerAdminMongoId: partnerAdminId})
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})


const compareFunction = (data)=>{

    const compareValidEventFun = (date,endDate,val)=>{
        const dateCon = (new Date(date).getFullYear()<=new Date().getFullYear()&&
        new Date(date).getMonth()<=new Date().getMonth()&&
        new Date(date).getDate()<=new Date().getDate())
   
        const dateCon2 = (new Date(endDate).getFullYear()<=new Date().getFullYear()&&
        new Date(endDate).getMonth()<=new Date().getMonth()&&
        new Date(endDate).getDate()<new Date().getDate())
   
   
     if(val==='cancel'||val==='done'){
        return false
     }else if(dateCon2){
         return false
     } else if(dateCon){
         return true
     }else if(!dateCon){
        return true   
     }else {
        return false
     }
    }

    return data.filter((el)=>compareValidEventFun(el.eventStartDate,el.eventEndDate,el.eventActive))
 
 }

router.get('/active-event/filter-by-employee/:employeeId', async function (req, res) {
    const employeeId = req.params.employeeId;
    try {
        const response = await eventDetails.find( { employeeMongoId: employeeId})
        return res.status(200).json(compareFunction(response));
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.get('/active-event/filter-by-admin/:partnerAdminId', async function (req, res) {
    const partnerAdminId = req.params.partnerAdminId;
    try {
        const response = await eventDetails.find({partnerAdminMongoId: partnerAdminId})
        return res.status(200).json(compareFunction(response));
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

module.exports = router