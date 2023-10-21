const express = require('express')
const router = express.Router()
//modelName
const memberForm = require('../Models/memberForm')

const valiDateRouteFun = require('./valiDateRouteFun')

valiDateRouteFun(router,memberForm)

router.post('/create', async (req, res) => {
    try {
                const temp = await new memberForm(req.body)
                const response = await temp.save();
                return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
});


router.get('/:id', async function (req, res) {
    try {
        const response = await memberForm.findById({ _id: req.params.id })
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.get('/clientReferenceId/:id', async function (req, res) {
    try {
        const response = await memberForm.find({ ClientReferrenceId: req.params.id })
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.get('/classes/all/:typeOFBatchClasses', async (req, res) => {
    try {   
        const {typeOFBatchClasses} = req.params;
        const response = await  memberForm.find({typeOFBatchClasses:typeOFBatchClasses})
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
});

router.get('/classes/filter-by-employee/:employeeId/:typeOFBatchClasses', async (req, res) => {
    try {   
        const {typeOFBatchClasses} = req.params;
        const employeeId = req.params.employeeId;

        const response = await  memberForm.find({typeOFBatchClasses:typeOFBatchClasses,employeeMongoId: employeeId})
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
});

router.get('/classes/filter-by-admin/:partnerAdminId/:typeOFBatchClasses', async (req, res) => {
    try {   
        const {typeOFBatchClasses} = req.params;
        const partnerAdminId = req.params.partnerAdminId;

        const response = await  memberForm.find({typeOFBatchClasses:typeOFBatchClasses,partnerAdminMongoId: partnerAdminId})
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
});


router.get('/attendance/:AttendanceID', async function (req, res) {
    try {
        const response = await memberForm.findOne({ AttendanceID: req.params.AttendanceID })
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.get('/name/:Fullname', async function (req, res) {
    try {
        const response = await memberForm.findOne({ Fullname: req.params.Fullname })
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.get('/mobile/:ContactNumber', async function (req, res) {
    try {
        const response = await memberForm.findOne({ ContactNumber: req.params.ContactNumber })
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.post('/update/:id', async (req, res) => {
    try {
        const response = await memberForm.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const response = await memberForm.findByIdAndDelete(req.params.id);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

module.exports = router
