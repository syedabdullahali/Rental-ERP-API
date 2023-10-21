const express = require('express');
const {ObjectId} = require('mongodb')
const eventBooking = require('../CRM/Eevent/eventBooking');
const eventDetails = require('../Master/CenterPartner/eventDetails');

const router = express.Router()
//modelName


const valiDateRouteFun = require('../Routes/valiDateRouteFun')
valiDateRouteFun(router,eventBooking)


const compareFunction2 = (date,endDate,val)=>{

    const dateCon = (new Date(date).getFullYear()<=new Date().getFullYear()&&
     new Date(date).getMonth()<=new Date().getMonth()&&
     new Date(date).getDate()<=new Date().getDate())

     const dateCon2 = (new Date(endDate).getFullYear()<=new Date().getFullYear()&&
     new Date(endDate).getMonth()<=new Date().getMonth()&&
     new Date(endDate).getDate()<new Date().getDate())


  
  if(val==='cancel'||val==='done'){
        return val
  }else if(dateCon2){
      return "Completed"
  } else if(dateCon){
      return "Start"
  }else if(!dateCon){
     return 'Upcoming...'   
  }
 }


function toGetNoOfClient(bookingData,eventData){
    const map = new Map()
    


    for (const values of bookingData){
        
  const  myObjectId = ObjectId(values.eventUniqID)
  const myObjectIdString = myObjectId.toString()
      if(!map.has(myObjectIdString)){
          map.set(myObjectIdString,1)
      }else{
         const val = map.get(myObjectIdString)
         map.set(myObjectIdString,val+1)
      }
    }
  
   return  eventData.map((el)=>{

  const  myObjectId = ObjectId(el._id)
   const myObjectIdString = myObjectId.toString()

    const obj ={
        eventName:el.eventName,
        eventBanner:el.eventBanner,
        hostName:el.hostName,
        service:el.service,
        comments:el.comments,
        eventType:el.eventType,
        eventStartDate:el.eventStartDate,
        eventEndDate:el.eventEndDate,
        eventTime:el.eventTime,
        duration:el.duration,
        clientLimit:el.clientLimit,
        fess:el.fess,
        paid:el.paid,
        eventActive:compareFunction2(el.eventStartDate,el.eventEndDate,el.eventActive),
        attendedClient:map.get(myObjectIdString),
        evntId:el._id
    }


      if(map.has(myObjectIdString)){
          return obj
      }else{
      obj.attendedClient=0
      return obj
      }
  })
}

router.post('/create', async (req, res) => {
    try {
           const dataCount = await eventBooking.countDocuments({eventUniqID:req.body.eventUniqID})
           if(!(((+dataCount)+1)<(+req.body.clientLimit))){
            return res.status(413).json({ error: "event limit has been full fill" })
           }
            const temp = await new eventBooking(req.body)
            const response = await temp.save();
            return res.status(200).json(response);
        
    } catch (err) {
        return res.status(500).json({ error: err })
    }
});


router.post('/update/:id', async (req, res) => {
    try {
        const response = await eventBooking.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const response = await eventBooking.findByIdAndDelete(req.params.id);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.get('/event-histroy/:startDateVal/:endDateVal/filter-by-admin/:partnerAdminId', async function (req, res) {
    const {startDateVal,endDateVal,partnerAdminId} =  req.params
    const endDate = new Date(endDateVal).setDate(new Date(endDateVal).getDate()+1)

    try {
        const response =  eventBooking.find({partnerAdminMongoId: partnerAdminId })
        const response1 = eventDetails.find({partnerAdminMongoId: partnerAdminId, 
            eventStartDate:{$gte:new Date(startDateVal),$lt:endDate}})

        const allData = await  Promise.all([response,response1])


        return res.status(200).json(toGetNoOfClient(allData[0], allData[1] ));
    } catch (err) {
        return res.status(500).json({ error: err })
    }
  })

  router.get('/event-histroy/:startDateVal/:endDateVal/filter-by-employee/:employeeId', async function (req, res) {
    const {startDateVal,endDateVal,employeeId} =  req.params
    const endDate = new Date(endDateVal).setDate(new Date(endDateVal).getDate()+1)
    try {
        const response =  eventBooking.find({employeeMongoId: employeeId})
        const response1 = eventDetails.find({employeeMongoId: employeeId,
            eventStartDate:{$gte:new Date(startDateVal),$lt:endDate}})

        const allData = await  Promise.all([response,response1])


        return res.status(200).json(toGetNoOfClient(allData[0], allData[1] ));    } catch (err) {
        return res.status(500).json({ error: err })
    }
  })


  router.get('/upcomeing-event/filter-by-admin/:partnerAdminId', async function (req, res) {
    const partnerAdminId = req.params.partnerAdminId;
    try {
        const response =  eventBooking.find({partnerAdminMongoId: partnerAdminId})
        const response1 = eventDetails.find({partnerAdminMongoId: partnerAdminId,eventActive:'active'})

        const allData = await  Promise.all([response,response1])


        return res.status(200).json(toGetNoOfClient(allData[0], allData[1] )?.filter((el)=>["Upcoming..."].includes(el.eventActive)));
    } catch (err) {
        return res.status(500).json({ error: err })
    }
  })

  router.get('/active-event/filter-by-admin/:partnerAdminId', async function (req, res) {
    const partnerAdminId = req.params.partnerAdminId;
    try {
        const response =  eventBooking.find({partnerAdminMongoId: partnerAdminId})
        const response1 = eventDetails.find({partnerAdminMongoId: partnerAdminId,eventActive:'active'})
        const allData = await  Promise.all([response,response1])
        return res.status(200).json(toGetNoOfClient(allData[0], allData[1] )?.filter((el)=>["Start"].includes(el.eventActive)));
    } catch (err) {
        return res.status(500).json({ error: err })
    }
  })



    router.get('/participants/:events/filter-by-employee/:employeeId', async function (req, res) {
        const employeeId = req.params.employeeId;
        const events = req.params.events;

        try {
            const response = await eventBooking.find({employeeMongoId: employeeId,eventUniqID:events})
            return res.status(200).json(response);
        } catch (err) {
            return res.status(500).json({ error: err })
        }
    })

    router.get('/participants/:events/filter-by-admin/:partnerAdminId', async function (req, res) {
        const partnerAdminId = req.params.partnerAdminId;
        const events = req.params.events;

        try {
            const response = await eventBooking.find({partnerAdminMongoId: partnerAdminId,eventUniqID:events})
            return res.status(200).json(response);
        } catch (err) {
            return res.status(500).json({ error: err })
        }
    })
    
module.exports = router