const express = require('express');
const Invoice = require('../Models/Invoice');
const memberForm = require('../Models/memberForm')
const enquiryForm = require('../Models/enquiryForm')
const router = express.Router()
//modelName

const valiDateRouteFun = require('./valiDateRouteFun')
valiDateRouteFun(router,Invoice)

router.post('/create', async (req, res) => {
    try {       
        const temp = await new Invoice(req.body)
        const response = await temp.save();
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
});

router.post('/update/:id', async (req, res) => {
    try {
        const response = await Invoice.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

function toHndleDailyCashReport(invoiceData){

    const filterOutReciptData = invoiceData.reverse().map((el)=>{
        const resiptsData =  el.Receipts.map((el2,i)=>{
          if(el2?.Pay_Mode ==='Cash'){
            el2.no =i
            return el2
          }   
        }).filter((el)=>el)

        // console.log(resiptsData)
        el.Receipts2=resiptsData
       return el
  })    

  function togetCashData(type,data){
    const data2 = (data||[]).reverse().flatMap((el)=>{
    


          if(type==='Recipts')
          {
            const reciptsArr = []
          el.Receipts2.forEach((el2,i)=>{

                const obj ={
                    cashHandOverto:'',
                    totalCash:+el2.PaidAmount,
                    date:el2.NewSlipDate,
                    type,
                    clientName:el.MemberName,
                    id:el.MemberId,
                    clientId:el.clientId,
                    InvoiceNo:el.InvoiceNo +"RN"+(el2.no+1),
                    counseller:el2.Counseller,
                    invoiceUniqId:el._id,
                    bothId:el2._id,
                    Receipts:el.Receipts,
                    no:el2.no,
                    nameOfDepositor:el2.nameOfDepositor,
                    depositorContact:el2.depositorContact,
                    discription:el2.discription
              }
  
               reciptsArr.push(obj)
                })



                return reciptsArr


          }else{
              return [{
                cashHandOverto:'',
                totalCash:el.paidAmount,
                date:el.createdAt,
                counseller:el.counseller,
                type,
                clientName:el.MemberName,
                clientId:el.clientId,
                InvoiceNo:el.InvoiceNo,
                id:el.MemberId,
                invoiceUniqId:el._id,
                bothId:el._id,
                nameOfDepositor:el.nameOfDepositor,
                depositorContact:el.depositorContact,
                discription:el.discription  
                    }] 
         }
    })

    return data2 
}

  const ReciptsData =   togetCashData('Recipts',[...filterOutReciptData.filter((el)=>el?.Receipts[0])])

//   console.log(ReciptsData)
  const InvoiceData =  togetCashData('Invoice',invoiceData.filter((el)=>el?.paymode ==='Cash'))  


return ReciptsData.concat(InvoiceData)


}



router.get('/daily-cash-report',async (req,res)=>{

    try {
        const response = await Invoice.find()
        return res.status(200).json(toHndleDailyCashReport(response));
    } catch (err) {
        return res.status(500).json({ error: err })
    }

})


router.get('/:id', async function (req, res) {
    try {
        const response = await Invoice.findById({ _id: req.params.id })
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.get('/invoiceGet/:memberId', async function (req, res) {
    try {
        const response = await Invoice.find({ MemberId: req.params.memberId })
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const response = await Invoice.findByIdAndDelete(req.params.id);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

module.exports = router