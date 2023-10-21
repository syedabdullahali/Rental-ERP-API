const express = require('express');
const clientAttendance = require('../Models/clientAttendance');
const router = express.Router()
//modelName


const valiDateRouteFun = require('./valiDateRouteFun')
valiDateRouteFun(router,clientAttendance)



router.post('/create', async (req, res) => {
    try {
        const temp = await new clientAttendance(req.body)
        const response = await temp.save();
        console.log(response);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
});

router.post('/update/:id', async (req, res) => {
    try {
        const response = await clientAttendance.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const response = await clientAttendance.findByIdAndDelete(req.params.id);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

module.exports = router