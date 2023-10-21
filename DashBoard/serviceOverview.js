const express = require('express')
const router = express.Router()

const batchModule =  require('../Models/Batch')
const invoiceModule =  require('../Models/Invoice')





function toHandleServiceOverview(serviceData,invoiceData){

 const serviceOverViewObj = {
    service:{
        allService:serviceData?.length, 

        activeServiceNum:0,
        activeServiceOutDoorNum:0,
        activeServiceInDoorNum:0,

        inactiveServiceNum:0,
        inactiveServiceInDoorNum:0,
        inactiveServiceOutDoorNum:0,

        activeService:[],
        inactiveService:[]
    },
    serviceIncome:{
       allServiceIncomeData:[]  
    }
 }

 //+'-active'
//+'-inactive'
 const map = new Map()
    for (const i in  serviceData){
    const service = serviceData[i].service_variation.trim().toLowerCase()   

    const initialObj = serviceData[i].typeOfTrainer=== 'In door'?{out:0,in:1,name:service}:{out:1,in:0,name:service}


    if(!map.has(service+'-active') && serviceData[i].status ){
       map.set(service+'-active',{...initialObj,status:'active'})
     }else if(map.has(service+'-active') &&  serviceData[i].status){
        map.set(service+'-active',{out:map.get(service+'-active').out+initialObj.out,in:map.get(service+'-active').in+initialObj.in,name:service,status:'active'})
      }
    if(!map.has(service+'-inactive') && !serviceData[i].status ){
        map.set(service+'-inactive',{...initialObj,status:'inactive'})
    }else if(map.has(service+'-inactive') &&  !serviceData[i].status){
        map.set(service+'-inactive',{out:map.get(service+'-inactive').out+initialObj.out,in:map.get(service+'-inactive').in+initialObj.in,name:service,status:'inactive'})

       }
     }

     for(let values of map.values()){
       
        
        const obj = {out:values.out,in:values.in,service:values.name}

        if(values.status==='active'){
         serviceOverViewObj.service.activeServiceNum+=(values.in+values.out)
         serviceOverViewObj.service.activeServiceInDoorNum+=(values.in)
         serviceOverViewObj.service.activeServiceOutDoorNum+=(values.out)


         serviceOverViewObj.service.activeService.push( obj )
        }
        if(values.status==='inactive'){
            serviceOverViewObj.service.inactiveServiceNum+=(values.in+values.out)
            serviceOverViewObj.service.inactiveServiceInDoorNum+=(values.in)
            serviceOverViewObj.service.inactiveServiceOutDoorNum+=(values.out)

            serviceOverViewObj.service.inactiveService.push(obj)
           }
    }

   const map2 = new Map()

    for (const i in invoiceData){
        const serviceName= invoiceData[i].ServiceName.trim().toLowerCase()   
        const collectedAmount = invoiceData[i].Receipts.reduce((crr,el)=>crr+ (+el.PaidAmount),0)  + invoiceData[i].paidAmount 

        if(!map2.has(serviceName)){
           map2.set(serviceName,{amount:invoiceData[i].amount,colectedAmount: collectedAmount})
        }else if(map2.has(serviceName)){
            const amount2 = map2.get(serviceName).amount
            const collectedAmount2 = map2.get(serviceName).colectedAmount
            map2.set(serviceName,{amount:amount2+invoiceData[i].amount,colectedAmount: collectedAmount2+collectedAmount})
        }

    }
 

    for(let [key,values] of map2.entries()){     
        const obj = {...values,serviceName:key}
        serviceOverViewObj.serviceIncome.allServiceIncomeData.push(obj)
    }


    return serviceOverViewObj 
}


router.get('/all', async function (req, res) {

    try {
        const response =  batchModule.find()
        const response1 = invoiceModule.find()
        const allData = await Promise.all([response,response1])

        return res.status(200).json(toHandleServiceOverview(allData[0],allData[1]))
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err })
    }
})


router.get('/filter-by-employee/:employeeId', async function (req, res) {
    const {employeeId} =  req.params

    try {
        const response =  batchModule.find({employeeMongoId: employeeId})
        const response1 = invoiceModule.find({employeeMongoId: employeeId})
        const allData = await Promise.all([response,response1])

        return res.status(200).json(toHandleServiceOverview(allData[0],allData[1]))
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})


router.get('/filter-by-admin/:partnerAdminId', async function (req, res) {
    const {partnerAdminId} =  req.params

    try {
        const response =  batchModule.find({partnerAdminMongoId: partnerAdminId})
        const response1 = invoiceModule.find({partnerAdminMongoId: partnerAdminId})
        const allData = await Promise.all([response,response1])

        return res.status(200).json(toHandleServiceOverview(allData[0],allData[1]))
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})



module.exports = router