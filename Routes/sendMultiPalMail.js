const express =   require('express')
const router = express.Router()
const nodemailer = require('nodemailer')


router.post('/mail',async (req,res)=>{
    // let testAccount = await nodemailer.createTestAccount();


try{
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: 'syedabdullahali380@gmail.com',
        pass: 'volovnvxxlkorwmw'
    }
  });

  // send mail with defined transport object
console.log(req.body.client.split(','))



let emailSent = false;

// Function to send the email
async function sendEmail() {
  // Check if the email has already been sent
  if (emailSent) {
    console.log('Email has already been sent.');
    return;
  }

  // Define the email options
  let infoMail = await transporter.sendMail({
    from:'syedabdullahali380@gmail.com', // sender address
    to: req.body.client.split(','),
    subject: req.body.subject,
    text: req.body.message,

  });

if(req.body.client){
    transporter.sendMail(infoMail,async (error,info)=>{
        console.log("hello")
        if(error){
          return  res.status(500).json({ error: error })
        }else if(info.accepted){
        emailSent = true; 
          return  res.status(200).json(req.body)
        }
        transporter.close();
      })
}
}

// Call the sendEmail function when needed
sendEmail();



}catch(error){
    return  res.status(500).json({ error: error })
}
//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//   res.json(info)

  // Preview only available when sending through an Ethereal account
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

)
// volovnvxxlkorwmw


// host: 'smtp.ethereal.email',
// port: 587,
// auth: {
//     user: 'elissa.champlin@ethereal.email',
//     pass: '4GGR45Nh77ge2D4zK1'
// }


module.exports = router