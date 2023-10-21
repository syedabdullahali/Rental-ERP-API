const upgradeCalls = require('../Employee/SalesCall/upgradeCalls');
const crosssaleCalls = require('../Employee/SalesCall/crosssaleCalls');
const renewalsCalls = require('../Employee/SalesCall/renewalsCalls');



const express = require('express')
const router = express.Router()


router.get('/:id', async function (req, res) {
    try {
        const response1 =   upgradeCalls.find({Member_Id: req.params.id })
        const response2 =  renewalsCalls.find({Member_Id: req.params.id })
        const response3 =  crosssaleCalls.find({Member_Id: req.params.id })

        const callData = await Promise.all([response1,response2,response3])

        return res.status(200).json([...callData[0],...callData[1],...callData[0]]);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})


module.exports = router

