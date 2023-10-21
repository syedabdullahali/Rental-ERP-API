const express = require('express');
const employeeTargetSheet = require('../../HRManagement/employeeTargetSheet');
const invoice1 = require('../../Models/Invoice')
const stockOrderList = require('../../Inventory/StockOrderList/stockOrderList')
const router = express.Router()



function toHnadleDailyTarget (allData){

    
 const monthName = ['Jan','Feb','March','April','May','June',
 'July','August','Sept','Oct', 'Nov', 'Dec']   

 const objTarget = {
    year:{
        year:new Date().getFullYear(),
        target:0,
        achived:0
    },
    month:{
        Jan:{target:0,achived:0},
        Feb:{target:0,achived:0},
        March:{target:0,achived:0},
        April:{target:0,achived:0},
        May:{target:0,achived:0},
        June:{target:0,achived:0},
        July:{target:0,achived:0},
        August:{target:0,achived:0},
        Sept:{target:0,achived:0},
        Oct:{target:0,achived:0},
        Nov:{target:0,achived:0},
        Dec:{target:0,achived:0}
    },
    today:{target:0,achived:0}

   }

   
      // Storing Given Target 
      allData[0].forEach((el)=>{
        if(+el.Year===new Date().getFullYear()){   
       objTarget.year.year = +el.Year
       objTarget.year.target += monthName.reduce((crr,el2)=>{
          objTarget.month[el2].target+= +el[el2]
          crr+= +el[el2]
          
          return crr
       },0)
       }
       })

     // Storing Achiving Target 

     // Receipts Data 
     const data =  allData[1].reduce((crr,el)=>{if(el.Receipts[0]){crr=[...el.Receipts,...crr]}return crr},[])

     data.forEach(el => {
        if(new Date(el.NewSlipDate).getFullYear() ===new Date().getFullYear()){      
           objTarget.year.year = new Date(el.NewSlipDate).getFullYear()
           objTarget.year.achived += monthName.reduce((crr,el2,i)=>{
               if(i===new Date().getMonth()){
                   objTarget.month[el2].achived+= +el.PaidAmount
                   crr+= +el.PaidAmount
               }               
              return crr
           },0)  
        }

        if(new Date(el.NewSlipDate).getMonth()===new Date().getMonth() &&
        new Date(el.NewSlipDate).getDate() ===new Date().getDate() &&
        new Date(el.NewSlipDate).getFullYear() ===new Date().getFullYear()
        ){
           objTarget.today.achived+=el.PaidAmount
        }
     });

     allData[1].forEach(el => {
       if(new Date(el.createdAt).getFullYear() ===new Date().getFullYear()){      
          objTarget.year.year = new Date(el.createdAt).getFullYear()
          objTarget.year.achived += monthName.reduce((crr,el2,i)=>{

           if(i===new Date().getMonth()){
               objTarget.month[el2].achived+= +el.paidAmount
               crr+= +el.paidAmount
           }
             return crr
          },0)  
       }

       if(new Date(el.createdAt).getMonth()===new Date().getMonth() &&
       new Date(el.createdAt).getDate() ===new Date().getDate() &&
       new Date(el.createdAt).getFullYear() ===new Date().getFullYear()
       ){
        objTarget.today.achived+=el.paidAmount
       }
       

    });

    allData[2].forEach(el => {
       if(new Date(el?.Order_Date).getFullYear() ===new Date().getFullYear()){      
          objTarget.year.year = new Date(el?.Order_Date).getFullYear()
          objTarget.year.achived += monthName.reduce((crr,el2,i)=>{

           
           if(i===new Date().getMonth()){
               objTarget.month[el2].achived+= +(+el?.Product_Price*+Math.abs(el?.Orders_Quantity))
               crr+= +(+el?.Product_Price*+Math.abs(el?.Orders_Quantity))
           }
             return crr
          },0)  
       }


       if(new Date(el.Order_Date).getMonth()===new Date().getMonth() &&
       new Date(el.Order_Date).getDate() ===new Date().getDate() &&
       new Date(el.Order_Date).getFullYear() ===new Date().getFullYear()
       ){
           objTarget.today.achived+=+(+el?.Product_Price*+Math.abs(el?.Orders_Quantity))
       }

    });
     
    function getDaysInMonth(month, year) {
       var date = new Date(year, month, 1);
       var days = [];
       while (date.getMonth() === month) {
         days.push(new Date(date));
         date.setDate(date.getDate() + 1);
       }
       return days.length;
     }

     objTarget.today.target  =
       (
       (objTarget.month[monthName[new Date().getMonth()]].target-
       objTarget.month[monthName[new Date().getMonth()]].achived
       )
       /        
       getDaysInMonth(new Date().getMonth(),new Date().getFullYear()))

       return objTarget
}




router.get('/all', async function (req, res) {
  
    try {
        const response1 = employeeTargetSheet.find()
        const response2 = invoice1.find()
        const response3 = stockOrderList.find({"Status": "Sold"})
        const allData = await Promise.all([response1,response2,response3])
        return res.status(200).json (toHnadleDailyTarget(allData) )
} catch (err) {
        console.log(err)
        return res.status(500).json({ error: err })
}
})

router.get('/filter-by-employee/:employeeId', async function (req, res) {
    const {employeeId} =  req.params

    try {
        const response1 = employeeTargetSheet.find({Id:employeeId,TargetValue:'Sales Target'})
        const response2 = invoice1.find({employeeMongoId: employeeId})
        const response3 = stockOrderList.find({"Status": "Sold",employeeMongoId: employeeId})
        const allData = await Promise.all([response1,response2,response3])
        return res.status(200).json (toHnadleDailyTarget(allData))
} catch (err) {
        console.log(err)
        return res.status(500).json({ error: err })
}
})

router.get('/filter-by-admin/:partnerAdminId', async function (req, res) {
    const {partnerAdminId} =  req.params
    try {
        const response1 = employeeTargetSheet.find({partnerAdminMongoId: partnerAdminId,TargetValue:'Sales Target'})
        const response2 = invoice1.find({partnerAdminMongoId: partnerAdminId})
        const response3 = stockOrderList.find({"Status": "Sold",partnerAdminMongoId: partnerAdminId})
        const allData = await Promise.all([response1,response2,response3])
        return res.status(200).json (toHnadleDailyTarget(allData))
} catch (err) {
        console.log(err)
        return res.status(500).json({ error: err })
}
})


module.exports = router