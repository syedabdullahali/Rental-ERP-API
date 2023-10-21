const express = require('express')
const router = express.Router()
const StockOrderList=require('../../Inventory/StockOrderList/stockOrderList')

router.post('/create',async(req,res)=>{
    try{
     const stockOrderList= await StockOrderList.create(req.body)
     res.status(200).json(stockOrderList);
    }catch (error) {
     console.log(error.message);
     res.status(500).json({message:error.message})
    }
 })


router.get('/all-order/all',async(req,res)=>{
    try{
        const  stockOrderList= await  StockOrderList.find({"Status": "Not Recevied yet"});
        res.status(200).json( stockOrderList);
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

router.get('/all-order/filter-by-employee/:employeeId', async function (req, res) {
    const employeeId = req.params.employeeId;
    try {
        const response = await StockOrderList.find({employeeMongoId: employeeId,"Status": "Not Recevied yet"})
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.get('/all-order/filter-by-admin/:partnerAdminId', async function (req, res) {
    const partnerAdminId = req.params.partnerAdminId;
    try {
        const response = await StockOrderList.find({partnerAdminMongoId: partnerAdminId,"Status": "Not Recevied yet"})
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})


// Recived All Route 

router.get('/recevied/all',async(req,res)=>{
    try{
        const  stockOrderList= await  StockOrderList.find({"Status": "Recevied"});
        res.status(200).json( stockOrderList);
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

router.get('/shop/:id',async(req,res)=>{
    try{
        const  stockOrderList= await  StockOrderList.find({ClientId: req.params.id});
        res.status(200).json( stockOrderList);
    }catch(error){
        res.status(500).json({message:error.message})
    }
})


router.get('/:startDateVal/:endDateVal/recevied/filter-by-employee/:employeeId', async function (req, res) {
    const {startDateVal,endDateVal,employeeId} =  req.params
    const endDate = new Date(endDateVal).setDate(new Date(endDateVal).getDate()+1)

    try {
        const response = await StockOrderList.find({"Status": "Recevied",employeeMongoId: employeeId,receivedDate:{$gte:new Date(startDateVal),$lt:endDate}})
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

 
router.get('/:startDateVal/:endDateVal/recevied/filter-by-admin/:partnerAdminId', async function (req, res) {
    const {startDateVal,endDateVal,partnerAdminId} =  req.params
    const endDate = new Date(endDateVal).setDate(new Date(endDateVal).getDate()+1)
    try {
        const response = await StockOrderList.find({"Status": "Recevied",partnerAdminMongoId: partnerAdminId,receivedDate:{$gte:new Date(startDateVal),$lt:endDate}})
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

// Sold All Route 

router.get('/sold/all',async(req,res)=>{
    try{
        const  stockOrderList= await  StockOrderList.find({"Status": "Sold"});
        res.status(200).json( stockOrderList);
    }catch(error){
        res.status(500).json({message:error.message})
    }
})


router.get('/sold/filter-by-employee/:employeeId', async function (req, res) {
    const employeeId = req.params.employeeId;
    try {
        const response = await StockOrderList.find({"Status": "Sold",employeeMongoId: employeeId})
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.get('/sold/filter-by-admin/:partnerAdminId', async function (req, res) {
    const partnerAdminId = req.params.partnerAdminId;
    try {
        const response = await StockOrderList.find({"Status": "Sold",partnerAdminMongoId: partnerAdminId})
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})





 

router.get('/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const   stockOrderList = await  StockOrderList.findById(id);
        res.status(200).json( stockOrderList);
    }catch(error){
        res.status(500).json({message:error.message})
    }
})



//to update stockOrderList by id
router.post('/update/:id',async(req,res)=>{
    try {
        const response = await StockOrderList.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

// delete a stock order list
router.delete('/delete/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const   stockOrderList = await  StockOrderList.findByIdAndDelete(id, req.body);
        //we cannot find any product in database
        if(!stockOrderList){
            return res.status(404).json({message:`cannot find any Stock Order List with ${id}`})
        }
        
        res.status(200).json(stockOrderList);
        
    }catch(error){
        res.status(500).json({message:error.message})
    }
})


module.exports = router
