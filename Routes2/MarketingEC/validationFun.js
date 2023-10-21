// Client
function findRenevalClient(list){
    const time =  (new Date(list.endDate) -new Date())
    const days = Math.ceil(time/(1000*60*60*24))
          if((days<15 && days>=0)){
             return true 
          }
          return false        
}
function findRenewedClient(list){
    const time =  (new Date(list.endDate) -new Date())
    const days = Math.ceil(time/(1000*60*60*24))
          if((days>=15 && list.renewed)){           
             return true 
          }
          return false                                                                           
}  

function findLeftClient(list){
  const time =  (new Date(list.endDate) -new Date())
        const days = Math.ceil(time/(1000*60*60*24))
              if((days<=0)){
                 return true 
              }
              return false    
}
// Enquiry 

function enquiryColdCall(list){
    if(list.CallStatus === 'Cold'){
        return true
    }
    return false
   }
   
   function findTrailEnquiry(list){
       if(list.appointmentfor === 'Trial Session'){
           return true
       }
    return false
   }
   
   function findApointment (list){
       if(list.appointmentfor === 'Appointment'){
           return true
       }
       return false
   }


module.exports = {
client:{
    findRenevalClient,
    findRenewedClient,
    findLeftClient
},
enquiry:{
    enquiryColdCall,
    findTrailEnquiry,
    findApointment,
}
}