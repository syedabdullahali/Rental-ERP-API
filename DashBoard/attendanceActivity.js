const express = require('express')
const router = express.Router()

const clientAttentance =  require('../Models/clientAttendance')
const memberFormDataSchema = require('../Models/memberForm')

const validationFun  = require('../Routes2/MarketingEC/validationFun')
const findLeftClientFun =validationFun.client.findLeftClient


router.get('/all', async function (req, res) {



function toHandleWeakleyAttendedReport(memBerData,clientAttendanceData){

    const obj = {
        totalActiveClients:0,
        attendedClient:0,
        weekly:{
        Sunday:0,    
        Monday:0,
        Tuesday:0,
        Wednesday:0,
        Thursday:0,
        Friday:0,
        Saturday:0,
        }
    }    
    

memBerData.forEach(el => {
    if(el.status === 'active' && !findLeftClientFun(el) ){
        obj.totalActiveClients+=1
    }
});


const attendedClientsIdArr =  clientAttendanceData.reduce((crr,el)=>{
if(!crr.includes(el.clientId)){
obj.weekly[Object.keys(obj.weekly)[new Date(el.checkDate).getDay()]]+=1
crr.push(el.clientId)
}
return crr
},[])

console.log(attendedClientsIdArr)

obj.attendedClient= attendedClientsIdArr?.length

return obj
}

    try {

        const curr = new Date; // get current date
        const first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        const last = first + 6; // last day is the first day + 6

        const firstday = new Date(curr.setDate(first));
        const lastday = new Date(curr.setDate(last+1));

        const response =   clientAttentance.find({createdAt:{$gte:new Date(firstday),$lt:lastday}})
        const response1 = memberFormDataSchema.find({status:'active'})
        const allData = await Promise.all([response1,response])


        return res.status(200).json(toHandleWeakleyAttendedReport(allData[0],allData[1]))
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err })
    }
})



module.exports = router