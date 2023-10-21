const express = require('express')
const router = express.Router()
//modelName
const packageMaster = require('../Master/CenterSetup/packageMaster')

const valiDateRouteFun = require('./valiDateRouteFun')
valiDateRouteFun(router,  packageMaster)

router.post('/create', async (req, res) => {
    try {
        const temp = await new packageMaster(req.body)
        const response = await temp.save();
        console.log(response);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
});

router.post('/update/:id', async (req, res) => {
    try {
        const response = await packageMaster.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const response = await packageMaster.findByIdAndDelete(req.params.id);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

module.exports = router