const express = require('express')
const router = express.Router()

const employeeForm = require('../Models/employeeForm')



router.post('/create', async (req, res) => {
    try {
        const {ContactNumber,FullName} = req.body

        let found = await employeeForm.findOne({ ContactNumber});

        if (found) return res.status(422).send({ error: FullName+ "Contact Number already Exists" });
        else{
        const temp = await new employeeForm(req.body)
        const response = await temp.save();
        return res.status(200).json(response);  
        }

    } catch (err) {
        return res.status(500).json({ error: err })
    }
});

router.get('/filter-by-employee/:employeeId', async function (req, res) {
    const employeeId = req.params.employeeId;
    try {
        const response = await employeeForm.find({employeeMongoId: employeeId,status:true,selected:'Select'})
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
  })
  
  router.get('/filter-by-admin/:partnerAdminId', async function (req, res) {
    const partnerAdminId = req.params.partnerAdminId;
    try {
        const response = await employeeForm.find({partnerAdminMongoId: partnerAdminId,status:true,selected:"Select"})
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
  })

  router.get('/all/filter-by-employee/:employeeId', async function (req, res) {
    const employeeId = req.params.employeeId;
    try {
        const response = await employeeForm.find({employeeMongoId: employeeId})
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
  })
  
  router.get('/all/filter-by-admin/:partnerAdminId', async function (req, res) {
    const partnerAdminId = req.params.partnerAdminId;
    try {
        const response = await employeeForm.find({partnerAdminMongoId: partnerAdminId})
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
  })


router.get('/:id', async function (req, res) {
    try {
        const response = await employeeForm.findById({ _id: req.params.id })
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.post('/update/:id', async (req, res) => {
    try {
        const response = await employeeForm.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const response = await employeeForm.findByIdAndDelete(req.params.id);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.get('/emp/:id', async function (req, res) {
    try {
        const response = await employeeForm.findById({ _id: req.params.id })
        return res.status(200).json([response]);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.get('/creater/:id', async function (req, res) {
    try {
        const response = await employeeForm.find({ partnerAdminMongoId: req.params.id })
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})
module.exports = router
