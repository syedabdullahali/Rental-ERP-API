const express = require('express');
const User = require('../Models/User');
const router = express.Router()
//modelName


router.patch('/update/invoicelogo/filter-by-admin/:partnerAdminId', async (req, res) => {
    try {
        const response = await User.findByIdAndUpdate(req.params.partnerAdminId, req.body);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.get('/filter-by-admin/:partnerAdminId', async function (req, res) {
    const partnerAdminId = req.params.partnerAdminId;
    try {
        const response = await User.findById({_id: partnerAdminId})
        if(response){
            return res.status(200).json({
                TNC:response.TNC,
                InvoiceLogo:response.InvoiceLogo,
                InvoiceTitle:response.InvoiceTitle,
                Address:response.Address
            });
        }
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

module.exports = router