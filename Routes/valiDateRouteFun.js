
const valiDateRouteFun = (router,moduleSchema) => {

    router.get('/all', async function (req, res) {
        try {
            const response = await moduleSchema.find()
            return res.status(200).json(response);
        } catch (err) {
            return res.status(500).json({ error: err })
        }
    })
    

    router.get('/filter-by-employee/:employeeId', async function (req, res) {
        const employeeId = req.params.employeeId;
        try {
            const response = await moduleSchema.find({employeeMongoId: employeeId})
            return res.status(200).json(response);
        } catch (err) {
            return res.status(500).json({ error: err })
        }
    })
    
    router.get('/filter-by-admin/:partnerAdminId', async function (req, res) {
        const partnerAdminId = req.params.partnerAdminId;
        try {
            const response = await moduleSchema.find({partnerAdminMongoId: partnerAdminId})
            return res.status(200).json(response);
        } catch (err) {
            return res.status(500).json({ error: err })
        }
    })
    
  
}

module.exports = valiDateRouteFun


