const express = require('express')
const router = express.Router()
//modelName
const emplDocument = require('../Models/emplDocument')

const valiDateRouteFun = require('./valiDateRouteFun')
valiDateRouteFun(router,emplDocument)

router.get('/emp/:MemBerId', async function (req, res) {
    const {MemBerId} = req.params;
    try {
        const response = await emplDocument.find({MemBerId:MemBerId})
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.post('/create', async (req, res) => {
    try {
        const temp = await new emplDocument(req.body)
        const response = await temp.save();
        console.log(response);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
});

router.post('/update/:id', async (req, res) => {
    try {
        const response = await emplDocument.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const response = await emplDocument.findByIdAndDelete(req.params.id);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

module.exports = router
