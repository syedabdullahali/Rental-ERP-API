// const dailyexp

const express = require('express')
const router = express.Router()


const dailyExpense = require('../Finance/Expense/dailyExpense');
const invoice = require('../Models/Invoice');
const StockOrderList = require('../Inventory/StockOrderList/stockOrderList')

const pettyCash = require('../Finance/Expense/pettyCash');
const trainerSalarySlip = require('../Models/trainerSalarySlip')
const salarySheetSlip = require('../Models/salarySheet')





function toHandleServiceActivity (expense,collection,year){


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

    const inittialObj2 = {year:year, month:{...month}}
    const inittialObj3 = {year:year, month:{...month}}

    const map2 = new Map() 
    const map3 = new Map() 


    const toHandleCalculation = (datakey,datekey,amountKey,type)=>{

        if(type==='expense'){
           expense[datakey].forEach((el)=>{
            const year = new Date(el?.[datekey]).getFullYear()
            const monthNum = new Date(el?.[datekey]).getMonth()
            const monthName = Object.keys(inittialObj2.month)[monthNum]
    
           if(!map2.has(year)){
              inittialObj2.month[monthName]+= +el?.[amountKey]
              map2.set(year,{year:year,month:inittialObj2.month})     
           }else {
             const obj =  map2.get(year)
             obj.month[monthName]+= +el?.[amountKey]
             map2.set(year,{...obj})     
           }
           })

        }

     if(type==='collection'){
            collection[datakey].forEach((el)=>{
                const year = new Date(el?.[datekey]).getFullYear()
                const monthNum = new Date(el?.[datekey]).getMonth()
                const monthName = Object.keys(inittialObj3.month)[monthNum]
        
               if(!map3.has(year)){
                 inittialObj3.month[monthName]+= +el?.[amountKey]
                  map3.set(year,{year:year,month:inittialObj3.month})    
        
               }else{
                 const obj =  map3.get(year)
                 obj.month[monthName]+= +el?.[amountKey]
                 map3.set(year,{...obj})     
               }
            })
 
        }

    }



    toHandleCalculation('pettyCash','Date','Credit','expense') 
    expense.trainerSalarySlip.forEach((el)=>{
        const year = new Date(el.date).getFullYear()
        const monthNum = new Date(el.date).getMonth()
        const monthName = Object.keys(inittialObj2.month)[monthNum]

       if(!map2.has(year)){
         inittialObj2.month[monthName]+= +(+el.amount)
          map2.set(year,{year:year,month:inittialObj2.month})    
       }else {
         const obj =  map2.get(year)
         obj.month[monthName]+= (+el.amount)
         map2.set(year,{...obj})     
       }

    })
    expense.salarySheet.forEach((el)=>{
        const year = new Date(el.month).getFullYear()
        const monthNum = new Date(el.month).getMonth()
        const monthName = Object.keys(inittialObj2.month)[monthNum]

       if(!map2.has(year)){
         inittialObj2.month[monthName]+= +(+el.netSalary)
          map2.set(year,{year:year,month:inittialObj2.month})    
       }else {
         const obj =  map2.get(year)
         obj.month[monthName]+= (+el.netSalary)
         map2.set(year,{...obj})     
       }

    })
   
    toHandleCalculation('reciptData','NewSlipDate','PaidAmount','collection') 
    toHandleCalculation('invoiceData','createdAt','paidAmount','collection') 


    collection.inventoryData.forEach((el)=>{
        const year = new Date(el?.Order_Date).getFullYear()
        const monthNum = new Date(el?.Order_Date).getMonth()
        const monthName = Object.keys(inittialObj3.month)[monthNum]

       if(!map3.has(year)){
         inittialObj3.month[monthName]+= +(+el?.Product_Price*+Math.abs(el?.Orders_Quantity))
         map3.set(year,{year:year,month:inittialObj3.month})    
       }else {
         const obj =  map3.get(year)
         obj.month[monthName]+= (+el?.Product_Price*+Math.abs(el?.Orders_Quantity))
         map3.set(year,{...obj})     
       }
    })

   
    const obj = {
      expense:(map2.get(year)||{ year:year, month:{...month}}),
      collection:(map3.get(year)||{ year:year, month:{...month}})
    }
    return  obj
}


router.get('/:year/all', async function (req, res) {
    const {year} =  req.params

    try {
    
        const response1 = invoice.find({})
        const response2 = StockOrderList .find({"Status": "Sold"})
        const response3=  invoice.find({},{Receipts:true})
        const response4 =  pettyCash.find()
        const response5 =  trainerSalarySlip .find()
        const response6 =  salarySheetSlip.find()

        const allData = await Promise.all([response1,response2,response3,response4,response5,response6])
        const data =  allData[2].reduce((crr,el)=>{if(el.Receipts[0]){crr=[...el.Receipts,...crr]}return crr},[])

return res.status(200).json(toHandleServiceActivity({pettyCash:allData[3],trainerSalarySlip:allData[4],
salarySheet:allData[5]},{invoiceData:allData[0],inventoryData:allData[1],reciptData:data},+year))
} catch (err) {
        console.log(err)
        return res.status(500).json({ error: err })
}
})

router.get('/:year/filter-by-employee/:employeeId', async function (req, res) {
    const {year,employeeId} =  req.params

    try {
    
        const response1 = invoice.find({employeeMongoId: employeeId})
        const response2 = StockOrderList .find({"Status": "Sold",employeeMongoId: employeeId})
        const response3=  invoice.find({employeeMongoId: employeeId},{Receipts:true})
        const response4 =  pettyCash.find({employeeMongoId: employeeId})
        const response5 =  trainerSalarySlip .find({employeeMongoId: employeeId})
        const response6 =  salarySheetSlip.find({employeeMongoId: employeeId})

        const allData = await Promise.all([response1,response2,response3,response4,response5,response6])
        const data =  allData[2].reduce((crr,el)=>{if(el.Receipts[0]){crr=[...el.Receipts,...crr]}return crr},[])

return res.status(200).json(toHandleServiceActivity({pettyCash:allData[3],trainerSalarySlip:allData[4],
salarySheet:allData[5]},{invoiceData:allData[0],inventoryData:allData[1],reciptData:data},+year))
} catch (err) {
        console.log(err)
        return res.status(500).json({ error: err })
}
})

router.get('/:year/filter-by-admin/:partnerAdminId', async function (req, res) {
    const {year,partnerAdminId} =  req.params

    try {
    
        const response1 = invoice.find({partnerAdminMongoId: partnerAdminId})
        const response2 = StockOrderList .find({"Status": "Sold",partnerAdminMongoId: partnerAdminId})
        const response3=  invoice.find({partnerAdminMongoId: partnerAdminId},{Receipts:true})
        const response4 =  pettyCash.find({partnerAdminMongoId: partnerAdminId})
        const response5 =  trainerSalarySlip .find({partnerAdminMongoId: partnerAdminId})
        const response6 =  salarySheetSlip.find({partnerAdminMongoId: partnerAdminId})

        const allData = await Promise.all([response1,response2,response3,response4,response5,response6])
        const data =  allData[2].reduce((crr,el)=>{if(el.Receipts[0]){crr=[...el.Receipts,...crr]}return crr},[])

return res.status(200).json(toHandleServiceActivity({pettyCash:allData[3],trainerSalarySlip:allData[4],
salarySheet:allData[5]},{invoiceData:allData[0],inventoryData:allData[1],reciptData:data},+year))
} catch (err) {
        console.log(err)
        return res.status(500).json({ error: err })
}
})

module.exports = router



