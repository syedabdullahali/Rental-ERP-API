const express = require('express');
const eventDetails = require('../Master/CenterPartner/centerPartner');
const router = express.Router()
//modelName

const valiDateRouteFun = require('../Routes/valiDateRouteFun')
valiDateRouteFun(router,eventDetails)



router.post('/create', async (req, res) => {
    try {
        const temp = await new eventDetails(req.body)
        const response = await temp.save();
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
});

router.post('/update/:id', async (req, res) => {
    try {
        const response = await eventDetails.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const response = await eventDetails.findByIdAndDelete(req.params.id);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

module.exports = router