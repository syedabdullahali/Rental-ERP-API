const express = require('express');
const productInvoice = require('../Models/productInvoice')
const router = express.Router()

const valiDateRouteFun = require('./valiDateRouteFun')
valiDateRouteFun(router, productInvoice)

router.post('/create', async (req, res) => {
    try {
        const temp = await new productInvoice(req.body)
        const response = await temp.save();
        console.log(response);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
});

router.get('/:id', async function (req, res) {
    try {
        const response = await productInvoice.findById({ _id: req.params.id })
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.get('/MemberId/:id', async function (req, res) {
    try {
        const response = await productInvoice.find({ MemberId: req.params.id })
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})


router.post('/update/:id', async (req, res) => {
    try {
        const response = await productInvoice.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const response = await productInvoice.findByIdAndDelete(req.params.id);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

module.exports = router









module.exports = router
