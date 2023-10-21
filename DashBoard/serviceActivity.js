const express = require('express')
const router = express.Router()


const meberFormData =  require('../Models/memberForm')
const dailyExpense = require('../Finance/Expense/dailyExpense');
const invoice = require('../Models/Invoice');
const StockOrderList = require('../Inventory/StockOrderList/stockOrderList')



function toHandleServiceActivity (memberFormData,dailyExpenseData,invoiceData,inventoryData,reciptData,year){

  console.log(reciptData)

    const month = {
        'January':0,
        'February':0,
        'March':0,
        'April':0,
        'May':0,
        'June':0,
        'July':0,
        'August':0,
        'September':0,
        'October':0,
        'November':0,
        'December':0,
    }

    const inittialObj = { year:year, month:{...month}}
    const inittialObj2 = {year:year, month:{...month}}
    const inittialObj3 = {year:year, month:{...month}}

    const  map = new Map()

    for (const i in memberFormData){
        const year = new Date(memberFormData[i].createdAt).getFullYear()
        const monthNum = new Date(memberFormData[i].createdAt).getMonth()
        const monthName = Object.keys(inittialObj.month)[monthNum]

       if(!map.has(year)){
        inittialObj.month[monthName]+=1
         map.set(year,{year:year,month:inittialObj.month})     
       }else if(map.has(year)){
         const obj = map.get(year)
         obj.month[monthName]+=1
        map.set(year,{...obj})     
       }
    }

    const map2 = new Map() 

    for (const i in dailyExpenseData){

        console.log(dailyExpenseData[i])

        const year = new Date(dailyExpenseData[i]?.Date).getFullYear()
        const monthNum = new Date(dailyExpenseData[i]?.Date).getMonth()
        const monthName = Object.keys(inittialObj2.month)[monthNum]

       if(!map2.has(year)){
        inittialObj2.month[monthName]+= +dailyExpenseData[i]?.Amount
          map2.set(year,{year:year,month:inittialObj2.month})     
       }else if(map2.has(year)){
         const obj =  map2.get(year)
         obj.month[monthName]+= +dailyExpenseData[i]?.Amount
         map2.set(year,{...obj})     
       }
    }

    const map3 = new Map() 

    for (const i in invoiceData){

        const year = new Date(invoiceData[i]?.createdAt).getFullYear()
        const monthNum = new Date(invoiceData[i]?.createdAt).getMonth()
        const monthName = Object.keys(inittialObj3.month)[monthNum]

       if(!map3.has(year)){
         inittialObj3.month[monthName]+= +invoiceData[i]?.paidAmount
          map3.set(year,{year:year,month:inittialObj3.month})    

       }else{
         const obj =  map3.get(year)
         obj.month[monthName]+= +invoiceData[i]?.paidAmount
         map3.set(year,{...obj})     
       }

      
    }

    for (const i in inventoryData){

        const year = new Date(inventoryData[i]?.Order_Date).getFullYear()
        const monthNum = new Date(inventoryData[i]?.Order_Date).getMonth()
        const monthName = Object.keys(inittialObj3.month)[monthNum]

       if(!map3.has(year)){
         inittialObj3.month[monthName]+= +(+inventoryData[i]?.Product_Price*+Math.abs(inventoryData[i]?.Orders_Quantity))
          map3.set(year,{year:year,month:inittialObj3.month})    

          console.log(year)
       }else {
         const obj =  map3.get(year)
         obj.month[monthName]+= (+inventoryData[i]?.Product_Price*+Math.abs(inventoryData[i]?.Orders_Quantity))
         map3.set(year,{...obj})     
       }
    }

    for (const i in reciptData){

        const year = new Date(reciptData[i]?.NewSlipDate).getFullYear()
        const monthNum = new Date(reciptData[i]?.NewSlipDate).getMonth()
        const monthName = Object.keys(inittialObj3.month)[monthNum]

       if(!map3.has(year)){
         inittialObj3.month[monthName]+= +reciptData[i]?.PaidAmount
          map3.set(year,{year:year,month:inittialObj3.month})    
       }else {
         const obj =  map3.get(year)
         obj.month[monthName]+=  +reciptData[i]?.PaidAmount
         map3.set(year,{...obj})     
       }
    }



   
    const obj = {
       memBerActivity:(map.get(year)||{ year:year, month:{...month}}),
      dailyExpense:(map2.get(year)||{ year:year, month:{...month}}),
      collection:(map3.get(year)||{ year:year, month:{...month}})
    }
    return  obj
}



router.get('/:year/all', async function (req, res) {

  const {year} =  req.params

    try {
        const response1 = meberFormData.find()
        const response2 = dailyExpense.find()
        const response3 = invoice.find()
        const response4 = StockOrderList.find({"Status": "Sold"})
        const response5 = invoice.find({},{Receipts:true})
        const allData = await Promise.all([response1,response2,response3,response4,response5])

        const data =  allData[4].reduce((crr,el)=>{if(el.Receipts[0]){crr=[...el.Receipts,...crr]}return crr},[])

        return res.status(200).json(toHandleServiceActivity(allData[0],allData[1],allData[2],allData[3],data,+year))
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err })
    }
})
router.get('/:year/filter-by-employee/:employeeId', async function (req, res) {

  const {year,employeeId} =  req.params

    try {
        const response1 = meberFormData.find({employeeMongoId: employeeId})
        const response2 = dailyExpense.find({employeeMongoId: employeeId})
        const response3 = invoice.find({employeeMongoId: employeeId})
        const response4 = StockOrderList.find({"Status": "Sold",employeeMongoId: employeeId})
        const response5 = invoice.find({employeeMongoId: employeeId},{Receipts:true})
        const allData = await Promise.all([response1,response2,response3,response4,response5])

        const data =  allData[4].reduce((crr,el)=>{if(el.Receipts[0]){crr=[...el.Receipts,...crr]}return crr},[])

        return res.status(200).json(toHandleServiceActivity(allData[0],allData[1],allData[2],allData[3],data,+year))
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err })
    }
})

router.get('/:year/filter-by-admin/:partnerAdminId', async function (req, res) {

  const {year,partnerAdminId} =  req.params

    try {
        const response1 = meberFormData.find({partnerAdminMongoId: partnerAdminId})
        const response2 = dailyExpense.find({partnerAdminMongoId: partnerAdminId})
        const response3 = invoice.find({partnerAdminMongoId: partnerAdminId})
        const response4 = StockOrderList.find({"Status": "Sold",partnerAdminMongoId: partnerAdminId})
        const response5 = invoice.find({partnerAdminMongoId: partnerAdminId},{Receipts:true})
        const allData = await Promise.all([response1,response2,response3,response4,response5])
        const data =  allData[4].reduce((crr,el)=>{if(el.Receipts[0]){crr=[...el.Receipts,...crr]}return crr},[])

        return res.status(200).json(toHandleServiceActivity(allData[0],allData[1],allData[2],allData[3],data,+year))
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err })
    }
})




module.exports = router