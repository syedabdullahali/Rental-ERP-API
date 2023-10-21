const express = require('express')
const router = express.Router()

const enquiryForm = require('../Models/enquiryForm')
const prospect = require('../Models/prospect')
const invoice = require('../Models/Invoice')
const memberFormData = require('../Models/memberForm')
const validationFun  = require('../Routes2/MarketingEC/validationFun')

const findRenevalClientFun = validationFun.client.findRenevalClient
const findRenewedClientFun = validationFun.client.findRenewedClient
const findLeftClientFun =validationFun.client.findLeftClient

const  compareDate2 = (startDate,endDate,elDate)=>{  
    return ((new Date(startDate).getTime()<=new Date(elDate).getTime())&&
              (new Date(elDate).getTime()<=new Date(endDate).getTime()))
}


function togetFilterDataNumber( enquiryData ,prospectData,invoiceData,memberFormData,receiptsData){

    const compareDate  = (startDate,breakDate)=>{
        let startDate2 = new Date(startDate)
        let breakDate2 = new Date(breakDate)
    
      return   (startDate2.getFullYear() === breakDate2.getFullYear()&&
      startDate2.getMonth() === breakDate2.getMonth()&&
      startDate2.getDate() === breakDate2.getDate())
    }


    const dataReportArr = {
        allEnquiry:{
        ENQUIRE:enquiryData.length,
        CONVERTED:0,
        TRIALS:0,
        NEW:0,
        PROSPECT:enquiryData.filter((list)=> list.CallStatus !== 'Cold' && list.appointmentfor === 'Prospect').length,
        COLD:enquiryData.filter((list)=>list.CallStatus === 'Cold'  ).length,
        APPOINTMENT: enquiryData.filter((list)=> list.CallStatus !== 'Cold' && list.appointmentfor === 'Appointment').length
        },
        invoice:{
                ['TOTAL SALES']:0,
                ['PAYMENT RECEIVED']:0,
                ['BALANCE PAYMENT']:0          
        },
        client:{
               ['ALL CLIENT']:memberFormData.length,
               ['ACTIVE']:0,
               ['NEW']:0,
               ['RENEWAL']:0,
               ['RENEWED']:0,
               ['LEFT']:0,
        }   

    }

// Enquiry 
    for (const index in enquiryData  ){
        if(enquiryData[index].enquirestatus==='notshow'){
                 dataReportArr.allEnquiry.CONVERTED+=1
        }
        if(enquiryData[index].appointmentfor === 'Trial Session'){
                 dataReportArr.allEnquiry.TRIALS+=1
        }
        if(compareDate(enquiryData[index].createdAt,new Date())){
                  dataReportArr.allEnquiry.NEW+=1
        }
            
    }

    invoiceData.forEach(el2 => {
                    dataReportArr.invoice['TOTAL SALES'] += (+el2.amount)
                    dataReportArr.invoice['PAYMENT RECEIVED'] += (+el2.paidAmount)
                    dataReportArr.invoice['BALANCE PAYMENT']+= (+el2.amount) -(+el2.paidAmount)
    });

    receiptsData.forEach(el2 => {
        dataReportArr.invoice['PAYMENT RECEIVED'] += (+el2.PaidAmount)
        dataReportArr.invoice['BALANCE PAYMENT']= (dataReportArr.invoice['BALANCE PAYMENT']-el2.PaidAmount)
});
     
    memberFormData.forEach(el => {
          if(el.status === 'active' && !findLeftClientFun(el) ){
            dataReportArr.client['ACTIVE']+=1
           }
           if(findRenevalClientFun(el)){
            dataReportArr.client['RENEWAL']+=1
           }
           if(findRenewedClientFun(el)){
            dataReportArr.client['RENEWED']+=1
           }
           if(findLeftClientFun(el)){
            dataReportArr.client['LEFT']+=1
           }
           if(compareDate(el.createdAt,new Date())){
            dataReportArr.client['NEW']+=1
           }
    });



    return dataReportArr

} 




router.get('/:startDateVal/:endDateVal/all', async function (req, res) {
    try {
        const {startDateVal,endDateVal} =  req.params
        const endDate = new Date(endDateVal).setDate(new Date(endDateVal).getDate()+1)

        const response1 =   enquiryForm.find({createdAt:{$gte:new Date(startDateVal),$lt:endDate}})
        const response2 =   []    
        const response3 =   invoice.find({createdAt:{$gte:new Date(startDateVal),$lt:endDate}})
        const response4 =   memberFormData.find({createdAt:{$gte:new Date(startDateVal),$lt:endDate}})
        const response5 =   invoice.find({},{Receipts:true})
        
        const allData  = await Promise.all([response1,response2,response3,response4,response5])       
        
       const data =  allData[4].reduce((crr,el)=>{if(el.Receipts[0]){
        crr=[...el.Receipts,...crr]}return crr
        },[]).filter((el)=>compareDate2(new Date(startDateVal),new Date(endDate),el.NewSlipDate))

        return res.status(200).json(togetFilterDataNumber(allData[0],allData[1],allData[2],allData[3],data));
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})
router.get('/:startDateVal/:endDateVal/filter-by-employee/:employeeId', async function (req, res) {
    try {
        const {startDateVal,endDateVal,employeeId} =  req.params
        const endDate = new Date(endDateVal).setDate(new Date(endDateVal).getDate()+1)

        const response1 =   enquiryForm.find({createdAt:{$gte:new Date(startDateVal),$lt: endDate},employeeMongoId: employeeId})
        const response2 =   []
        const response3 =   invoice.find({createdAt:{$gte:new Date(startDateVal),$lt: endDate},employeeMongoId: employeeId})
        const response4 =   memberFormData.find({createdAt:{$gte:new Date(startDateVal),$lt:endDate},employeeMongoId: employeeId})
        const response5 =   invoice.find({employeeMongoId: employeeId},{Receipts:true})
        const allData  = await Promise.all([response1,response2,response3,response4,response5])       

  
        const data =  allData[4].reduce((crr,el)=>{if(el.Receipts[0]){
            crr=[...el.Receipts,...crr]}return crr
            },[]).filter((el)=>compareDate2(new Date(startDateVal),new Date(endDate),el.NewSlipDate))

        return res.status(200).json(togetFilterDataNumber(allData[0],allData[1],allData[2],allData[3],data));
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})
router.get('/:startDateVal/:endDateVal/filter-by-admin/:partnerAdminId', async function (req, res) {
    try {
        const {startDateVal,endDateVal,partnerAdminId} =  req.params
        const endDate = new Date(endDateVal).setDate(new Date(endDateVal).getDate()+1)

        const response1 =   enquiryForm.find({createdAt:{$gte:new Date(startDateVal),$lt:endDate},partnerAdminMongoId: partnerAdminId})
        const response2 =   []
        const response3 =   invoice.find({createdAt:{$gte:new Date(startDateVal),$lt:endDate},partnerAdminMongoId: partnerAdminId})
        const response4 =   memberFormData.find({createdAt:{$gte:new Date(startDateVal),$lt:endDate},partnerAdminMongoId: partnerAdminId})
        const response5 =   invoice.find({partnerAdminMongoId: partnerAdminId},{Receipts:true})
     

        const allData  = await Promise.all([response1,response2,response3,response4,response5])     

        const data =  allData[4].reduce((crr,el)=>{if(el.Receipts[0]){
            crr=[...el.Receipts,...crr]}return crr
            },[]).filter((el)=>compareDate2(new Date(startDateVal),endDate,el.NewSlipDate))
        
        return res.status(200).json(togetFilterDataNumber(allData[0],allData[1],allData[2],allData[3],data));
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

module.exports = router