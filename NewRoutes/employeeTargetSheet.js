const express = require('express');
const employeeTargetSheet = require('../HRManagement/employeeTargetSheet');
const router = express.Router()
//modelName




router.post('/create', async (req, res) => {
    try {
        const temp = await new employeeTargetSheet(req.body)
        const response = await temp.save();
        console.log(response);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
});

router.post('/update/:id', async (req, res) => {
    try {
        const response = await employeeTargetSheet.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const response = await employeeTargetSheet.findByIdAndDelete(req.params.id);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.get('/filter-by-employee/:employeeId', async function (req, res) {
    const employeeId = req.params.employeeId;
    try {
        const response = await employeeTargetSheet.find({ Id: employeeId})
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.get('/filter-by-admin/:partnerAdminId', async function (req, res) {
    const partnerAdminId = req.params.partnerAdminId;
    try {
        const response = await employeeTargetSheet.find({partnerAdminMongoId: partnerAdminId})
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

module.exports = router