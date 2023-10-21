const express = require('express')
const router = express.Router()
//modelName
const prospect = require('../Models/prospect')

const valiDateRouteFun = require('./valiDateRouteFun')

router.get('/:startDateVal/:endDateVal/all', async function (req, res) {
    try {
        const {startDateVal,endDateVal} = req.params
        const endDate = new Date(endDateVal).setDate(new Date(endDateVal).getDate()+1)

        const response = await prospect.find({createdAt:{$gte:new Date(startDateVal),$lt:endDate}})
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})


router.get('/:startDateVal/:endDateVal/filter-by-employee/:employeeId', async function (req, res) {
    const {startDateVal,endDateVal,employeeId} = req.params;
    const endDate = new Date(endDateVal).setDate(new Date(endDateVal).getDate()+1)

    try {
        const response = await prospect.find({employeeMongoId: employeeId,createdAt:{$gte:new Date(startDateVal),$lt:endDate}})
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.get('/:startDateVal/:endDateVal/filter-by-admin/:partnerAdminId', async function (req, res) {
    const {partnerAdminId,startDateVal,endDateVal} = req.params;
    const endDate = new Date(endDateVal).setDate(new Date(endDateVal).getDate()+1)

    try {
        const response = await prospect.find({partnerAdminMongoId: partnerAdminId,createdAt:{$gte:new Date(startDateVal),$lt:endDate}})
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.post('/create', async (req, res) => {
    try {

        const temp = await new prospect(req.body)
        const response = await temp.save();
        console.log(response);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
});

router.post('/update/:id', async (req, res) => {
    try {
        const response = await prospect.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.get('/:id', async function (req, res) {
    try {
        const response = await prospect.findById({ _id: req.params.id })
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})


router.get('/EnquiryID/:EnquiryID', async function (req, res) {
    try {
        const response = await prospect.findOne({ EnquiryID: req.params.EnquiryID })
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const response = await prospect.findByIdAndDelete(req.params.id);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

module.exports = router