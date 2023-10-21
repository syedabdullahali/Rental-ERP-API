function toFindUniqCollectionVa(el,collectionName,collectionObj){


const {handleSearchValInclude,collectionArr,inputVal}  = collectionObj

function findLeftClient(list){
        const time =  (new Date(list.endDate) -new Date())
        const days = Math.ceil(time/(1000*60*60*24))
              if((days<=0)){
                 return true 
              }
              return false   
}       


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


function toHandleVal(stringVal){
   if(!collectionArr.includes(stringVal)){
      collectionArr.push(stringVal)
   } 
}  

function findWelcomeClient(list){
    const time =  (new Date(list.createdAt) -new Date())

    const days = Math.ceil(time/(1000*60*60*24))

          if((days>=-15 )){
             return true 
          }
          return false      
}




switch (collectionName) {
  case "enquiryforms":
    if(el?.appointmentfor?.trim()&& el?.enquirestatus!=='notshow'){
        toHandleVal(el?.CallStatus === 'Cold'?el?.CallStatus:el?.appointmentfor?.trim())
    }
    if(el?.ServiceName===inputVal){
        toHandleVal('newClientRevenue')
    }
    if(el?.enquirytype===inputVal){
        toHandleVal('leadReport')
    }
  break;
  case 'memberfroms':
    if(el.status === 'active' && !findLeftClient(el)){
        toHandleVal('activeClient')
    }else if(findLeftClient(el)){
        toHandleVal('leftClient')
    }
    if(findRenevalClient(el)){
        toHandleVal('renewalClient')
    }else if(findRenewedClient(el)){
        toHandleVal('renewedClient')
    }
    if(el.serviceName===inputVal){
        toHandleVal('renewalsUpgradeRevenue')
    }

    if(el.typeOFBatchClasses==='TTC Classes'){
        toHandleVal('ttcClient')
    }

    if(findWelcomeClient(el)){
        toHandleVal('welcomeClient')
    }
    
    if(findWelcomeClient(el)){
        toHandleVal('welcomeClient')
    }
    
   if(el.typeOFBatchClasses ==='Live Classes'){
        toHandleVal('liveClassesForm')
   }else if(el.typeOFBatchClasses ==='PT Classes'){
        toHandleVal('ptClassesForm')
   }else if(el.typeOFBatchClasses ==='"TTC Classes'){
        toHandleVal('ttcClasses')
   }else if(el.typeOFBatchClasses==='Studio Batches'){
        toHandleVal('studioBatches')
   }else {
        toHandleVal('allMemberBatches')
   }

  break;   
    case 'stockorderlists': 
    if(el.Status === 'Sold'){
        toHandleVal('stockorderlistsSold')
    }
    case 'invoices':
    if(+el.paidAmount>0 ){
        toHandleVal('paidinvoice')
    }else if(+el.pendingAmount >0 &&  el.status!=='cancel'){
        toHandleVal('pendingAmount')
    }else if( el?.Receipts?.length &&  el.status!=='cancel'){
        toHandleVal('receipts')
    }else if(el.status==='cancel'){
        toHandleVal('cancelinvoice')
    }
    if(el?.ServiceName===inputVal){
        toHandleVal('serviceRevenue')
    }
    if(el?.counseller===inputVal){
        toHandleVal('paymentMode')
    }
    if(el?.paymode ==='Cash'&&
        el.paidAmount ===inputVal||
        el.counseller ===inputVal||
        el.MemberName ===inputVal||
        el.clientId ===inputVal||
        el.InvoiceNo ===inputVal||
        el.MemberId===inputVal){
            toHandleVal('dailyCashReprt')
      
    }

    if(el.paymode ==='Cheque'&&
     el.checkNo===inputVal||
     el.bankName===inputVal||
     el.checkNo===inputVal||
     el.counseller===inputVal
     ){

        toHandleVal('chequeReport')   
    }

    if(el.pendingAmount<=0){
        toHandleVal('paymentCall')
    }
    break;

    case "employeeforms":
    if(el?.selected === 'Select'){
        toHandleVal('employee')   
    }else{
        toHandleVal('recuritment')   
    }

    if(el.selected ==='Select'&&
    el.JobDesignation===inputVal||
    el.Department===inputVal||
    el.AttendanceID===inputVal||
    (el.ContactNumber+"")===inputVal||
    el.centerCodeC===inputVal||
    el.EmployeeCategory===inputVal){
        toHandleVal('attendedRegister')   
    }
    case "staffattentances":
        if(el.StaffName ===inputVal&&
    el.attentanceId===inputVal||
    el.centerId===inputVal||
    el.staffId===inputVal||
    (el.staffContact+"")===inputVal||
    el.centerCodeC===inputVal||
    el.EmployeeCategory===inputVal||
    el.classesId===inputVal){
        toHandleVal('attendedRegister')   
    }
  
    if(el.attentanceId ===inputVal ||
        el.StaffName ===inputVal ||
        el.Designation === inputVal ||
        el.shiftTimeing === inputVal){
        toHandleVal('trainerReport')   
    }
    break

    case "clientattentances":
    if(el.category ==='Live Classes'){
        toHandleVal('liveClassesForm')
   }else if(el.category ==='PT Classes'){
        toHandleVal('ptClassesForm')
   }else if(el.category ==='"TTC Classes'){
        toHandleVal('ttcClasses')
   }else if(el.category==='Studio Batches'){
        toHandleVal('studioBatches')
   }else {
        toHandleVal('allMemberBatches')
   }
   break


  default:

  toHandleVal("No value found");
}

}

module.exports = toFindUniqCollectionVa