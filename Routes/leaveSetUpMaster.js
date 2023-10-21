const express = require('express')
const router = express.Router()
//modelName
const leaveSetUpMaster = require('../Models/leaveSetUpMaster')

const valiDateRouteFun = require('./valiDateRouteFun')
valiDateRouteFun(router,  leaveSetUpMaster)

router.post('/create', async (req, res) => {
    try {
        const temp = await new leaveSetUpMaster(req.body)
        const response = await temp.save();
        console.log(response);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
});

router.get('/:id', async function (req, res) {
    try {
        const response = await leaveSetUpMaster.findById({ _id: req.params.id })
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})



router.post('/update/:id', async (req, res) => {
    try {
        const response = await leaveSetUpMaster.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const response = await leaveSetUpMaster.findByIdAndDelete(req.params.id);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

module.exports = router