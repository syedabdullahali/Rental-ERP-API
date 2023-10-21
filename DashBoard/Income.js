const express = require('express')
const router = express.Router()

const invoiceA = require('../Models/Invoice')
const StockOrderListA = require('../Inventory/StockOrderList/stockOrderList')
const employeeTargteSheet = require('../HRManagement/employeeTargetSheet')


function toHandleServiceActivity (invoiceData,inventoryData,reciptData,empLoyeeTargetData,year){

          
    const month = {
        'January':{target:0,achived:0},
        'February':{target:0,achived:0,},
        'March':{target:0,achived:0, },
        'April':{target:0,achived:0},
        'May':{target:0,achived:0},
        'June':{target:0,achived:0},
        'July':{target:0, achived:0},
        'August':{target:0,achived:0},
        'September':{target:0,achived:0},
        'October':{target:0,achived:0},
        'November':{target:0,achived:0},
        'December':{target:0,achived:0,},
    }

    const monthNames2 = [
        ["Jan",'January'],
        ["Feb",'February'],
        ["March",'March'],
        ["April",'April'],
        ["May","May"],
        ["June",'June'],
        ["July",'July'],
        ["August",'August'],
        ["Sept",'September'],
        ["Oct",'October'],
        ["Nov",'November'],
        ["Dec",'December']
    ]
 
    const inittialObj3 = {year:year, month:{...month}}


    const map3 = new Map() 

    for (const i in invoiceData){

        const year = new Date(invoiceData[i]?.createdAt).getFullYear()
        const monthNum = new Date(invoiceData[i]?.createdAt).getMonth()
        inittialObj3.month  = {
        'January':{target:0,achived:0},
        'February':{target:0,achived:0,},
        'March':{target:0,achived:0, },
        'April':{target:0,achived:0},
        'May':{target:0,achived:0},
        'June':{target:0,achived:0},
        'July':{target:0, achived:0},
        'August':{target:0,achived:0},
        'September':{target:0,achived:0},
        'October':{target:0,achived:0},
        'November':{target:0,achived:0},
        'December':{target:0,achived:0,},
    }
        const monthName = Object.keys(inittialObj3.month)[monthNum]

       if(!map3.has(year)){
         inittialObj3.month[monthName].achived += +invoiceData[i]?.paidAmount
          map3.set(year,{year:year,month:inittialObj3.month})    

       }else{
         const obj =  map3.get(year)
         obj.month[monthName].achived+= +invoiceData[i]?.paidAmount
         map3.set(year,{...obj})     
       }

      
    }

    for (const i in inventoryData){

        const year = new Date(inventoryData[i]?.Order_Date).getFullYear()
        const monthNum = new Date(inventoryData[i]?.Order_Date).getMonth()
        inittialObj3.month  = {
          'January':{target:0,achived:0},
          'February':{target:0,achived:0,},
          'March':{target:0,achived:0, },
          'April':{target:0,achived:0},
          'May':{target:0,achived:0},
          'June':{target:0,achived:0},
          'July':{target:0, achived:0},
          'August':{target:0,achived:0},
          'September':{target:0,achived:0},
          'October':{target:0,achived:0},
          'November':{target:0,achived:0},
          'December':{target:0,achived:0,},
      }
        const monthName = Object.keys(inittialObj3.month)[monthNum]

       if(!map3.has(year)){
         inittialObj3.month[monthName].achived+= +(+inventoryData[i]?.Product_Price*+Math.abs(inventoryData[i]?.Orders_Quantity))
          map3.set(year,{year:year,month:inittialObj3.month})    
       }else {
         const obj =  map3.get(year)
         obj.month[monthName].achived+= +(+inventoryData[i]?.Product_Price*+Math.abs(inventoryData[i]?.Orders_Quantity))
         map3.set(year,{...obj})     
       }
    }

    for (const i in reciptData){

        const year = new Date(reciptData[i]?.NewSlipDate).getFullYear()
        const monthNum = new Date(reciptData[i]?.NewSlipDate).getMonth()
        inittialObj3.month  = {
          'January':{target:0,achived:0},
          'February':{target:0,achived:0,},
          'March':{target:0,achived:0, },
          'April':{target:0,achived:0},
          'May':{target:0,achived:0},
          'June':{target:0,achived:0},
          'July':{target:0, achived:0},
          'August':{target:0,achived:0},
          'September':{target:0,achived:0},
          'October':{target:0,achived:0},
          'November':{target:0,achived:0},
          'December':{target:0,achived:0,},
      }
        const monthName = Object.keys(inittialObj3.month)[monthNum]

       if(!map3.has(year)){
         inittialObj3.month[monthName].achived+= +reciptData[i]?.PaidAmount
          map3.set(year,{year:year,month:inittialObj3.month})    
       }else {
         const obj =  map3.get(year)
         obj.month[monthName].achived+=  +reciptData[i]?.PaidAmount
         map3.set(year,{...obj})     
       }
    }



    for (const i in empLoyeeTargetData){

        const year =  empLoyeeTargetData[i]?.Year


       if(!map3.has(+year)){
        monthNames2.forEach((el)=>{
            
                inittialObj3.month[el[1]].target+= (+empLoyeeTargetData[i][el[0]])
        })
                  map3.set(year,{year:year,month:inittialObj3.month})    
       }else {
         const obj =  map3.get(+year)
         monthNames2.forEach((el)=>{
            obj.month[el[1]].target+= (+empLoyeeTargetData[i][el[0]])
          })
         map3.set(year,{...obj})     
       }
    }

   
    const obj = {
      collection:(map3.get(year)||{ year:year, month:{...month}})
    }
    return  obj
}

router.get('/:year/all', async function (req, res) {

    const {year} =  req.params


    try {
      
        const response = invoiceA.find()
        const response1 = StockOrderListA.find({"Status": "Sold"})
        const response2= invoiceA.find({},{Receipts:true})
        const response3 =  employeeTargteSheet.find({Type_Of_Target:'Sales Target',Year:+year})


        const allData = await Promise.all([response,response1,response2,response3])
        const data =  allData[2].reduce((crr,el)=>{if(el.Receipts[0]){crr=[...el.Receipts,...crr]}return crr},[])


        return res.status(200).json(toHandleServiceActivity(allData[0],allData[1],data,allData[3],+year))
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err })
    }
})

router.get('/:year/filter-by-employee/:employeeId', async function (req, res) {

  const {year,employeeId} =  req.params


  try {
    
      const response = invoiceA.find({employeeMongoId: employeeId})
      const response1 = StockOrderListA.find({"Status": "Sold",employeeMongoId: employeeId})
      const response2= invoiceA.find({employeeMongoId: employeeId},{Receipts:true})
      const response3 =  employeeTargteSheet.find({Type_Of_Target:'Sales Target',Year:+year,employeeMongoId: employeeId})


      const allData = await Promise.all([response,response1,response2,response3])
      const data =  allData[2].reduce((crr,el)=>{if(el.Receipts[0]){crr=[...el.Receipts,...crr]}return crr},[])


      return res.status(200).json(toHandleServiceActivity(allData[0],allData[1],data,allData[3],+year))
  } catch (err) {
      console.log(err)
      return res.status(500).json({ error: err })
  }
})

module.exports = router


router.get('/:year/filter-by-admin/:partnerAdminId', async function (req, res) {

  const {year,partnerAdminId} =  req.params


  try {
    
      const response =  invoiceA.find({partnerAdminMongoId: partnerAdminId})
      const response1 = StockOrderListA.find({"Status": "Sold",partnerAdminMongoId: partnerAdminId})
      const response2=  invoiceA.find({partnerAdminMongoId: partnerAdminId},{Receipts:true})
      const response3 = employeeTargteSheet.find({Type_Of_Target:'Sales Target',Year:+year,partnerAdminMongoId: partnerAdminId})


      const allData = await Promise.all([response,response1,response2,response3])
      const data =  allData[2].reduce((crr,el)=>{if(el.Receipts[0]){crr=[...el.Receipts,...crr]}return crr},[])


      return res.status(200).json(toHandleServiceActivity(allData[0],allData[1],data,allData[3],+year))
  } catch (err) {
      console.log(err)
      return res.status(500).json({ error: err })
  }
})

module.exports = router

