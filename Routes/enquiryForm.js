const express = require('express')
const router = express.Router()
//modelName
const enquiryForm = require('../Models/enquiryForm')
const valiDateRouteFun = require('./valiDateRouteFun')

valiDateRouteFun(router,enquiryForm)


router.post('/xlsx/add', async (req, res) => {
    try {
        const response  = await enquiryForm.insertMany([...req.body])
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
});


router.post('/create', async (req, res) => {
    try {
        
        const {ContactNumber,Fullname} = req.body
        let found = await enquiryForm.findOne({ ContactNumber});

        if (found) return res.status(422).send({ error: Fullname+ "Contact Number already Exists" });
        else{
            const temp = await new enquiryForm(req.body)
            const response = await temp.save();
            return res.status(200).json(response);
        }
    } catch (err) {
        return res.status(500).json({ error: err })
    }
});

router.get('/:id', async function (req, res) {
    try {
        const response = await enquiryForm.findById({ _id: req.params.id })
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})


router.post('/update/:id', async (req, res) => {
    try { 
            const response = await enquiryForm.findByIdAndUpdate(req.params.id, req.body);
            return res.status(200).json(response)
        
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const response = await enquiryForm.findByIdAndDelete(req.params.id);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.get('/:startDateVal/:endDateVal/filter-by-employee/:employeeId', async function (req, res) {
    try {
        const {startDateVal,endDateVal,employeeId} =  req.params
        const endDate = new Date(endDateVal).setDate(new Date(endDateVal).getDate()+1)
        const response =  await enquiryForm.find({createdAt:{$gte:new Date(startDateVal),$lt: endDate},employeeMongoId: employeeId})
        return res.status(200).json(response)

    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.get('/:startDateVal/:endDateVal/filter-by-admin/:partnerAdminId', async function (req, res) {
    try {
        const {startDateVal,endDateVal,partnerAdminId} =  req.params
        const endDate = new Date(endDateVal).setDate(new Date(endDateVal).getDate()+1)
        const response =  await enquiryForm.find({createdAt:{$gte:new Date(startDateVal),$lt: endDate},partnerAdminMongoId: partnerAdminId})
        return res.status(200).json(response)

    } catch (err) {
        return res.status(500).json({ error: err })
    }
})


module.exports = router


