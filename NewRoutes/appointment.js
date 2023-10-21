const express = require('express');
const appointment = require('../Navbar/appointment');
const router = express.Router()
//modelName


const valiDateRouteFun = require('../Routes/valiDateRouteFun')
valiDateRouteFun(router,appointment)

router.post('/create', async (req, res) => {
    try {
        const temp = await new appointment(req.body)
        const response = await temp.save();
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
});

router.post('/update/:id', async (req, res) => {
    try {
        const response = await appointment.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const response = await appointment.find({Sr_No: req.params.id });
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const response = await appointment.findByIdAndDelete(req.params.id);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

module.exports = router