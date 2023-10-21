const express = require('express');
const clientDocument = require('../CRM/ClientManagement/clientDocument');
const router = express.Router()
//modelName


const valiDateRouteFun = require('../Routes/valiDateRouteFun')
valiDateRouteFun(router,clientDocument)

router.get('/:memberId', async (req, res) => {
    try {
        const response = await clientDocument.find({memberId:req.params.memberId})
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
});


router.post('/create', async (req, res) => {
    try {
        const temp = await new clientDocument(req.body)
        const response = await temp.save();
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
});

router.post('/update/:id', async (req, res) => {
    try {
        const response = await clientDocument.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const response = await clientDocument.findByIdAndDelete(req.params.id);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

module.exports = router