const express = require('express')
const mongoose = require('mongoose')
const app = express();
var cors = require('cors')
const userValidate = require('./Routes/jwt')
app.use(cors())
const bodyParser = require('body-parser')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const port = process.env.PORT || 8000
app.use(express.json())
app.use('/enquiryForm', userValidate, require('./Routes/enquiryForm'));
app.use('/signup', require('./Routes/signup'));
app.use('/login', require('./Routes/login'));
app.use('/Referral', userValidate, require('./Routes/Referral'));
app.use('/Document', userValidate, require('./Routes/Document'));
app.use('/fitnessDetail', userValidate, require('./Routes/fitnessDetails'));
app.use('/dietDetail', userValidate, require('./Routes/DietDetails'));
app.use('/AppointmentClient', userValidate, require('./Routes/AppointmentClient'));
app.use('/renewedClients', userValidate, require('./Routes/renewedClients'));
app.use('/activeClients', userValidate, require('./Routes/activeClients'));
app.use('/allClients', userValidate, require('./Routes/allClients'));
app.use('/expriryClients', userValidate, require('./Routes/expriryClients'));
app.use('/Servicedata', userValidate, require('./Routes/Servicedata'));
app.use('/Payment', userValidate, require('./Routes/Payment'));
app.use('/individualMember', userValidate, require('./Routes/individualMember'));
app.use('/Batch', userValidate, require('./Routes/Batch'));
app.use('/Companyprofile', userValidate, require('./Routes/Companyprofile'));
app.use('/Package', userValidate, require('./Routes/Package'));
app.use('/offer', userValidate, require('./Routes/offer'));
app.use('/brandlogoupdate', userValidate, require('./Routes/brandlogoupdate'));
app.use('/service', userValidate, require('./Routes/service'));
app.use('/staffAttendance', userValidate, require('./Routes/staffAttentance'));
app.use('/clientAttendance', userValidate, require('./Routes/clientAttendance'));
app.use('/employeeAttendance', userValidate, require('./Routes/employeeAttendance'));
app.use('/prospect', userValidate, require('./Routes/prospect'));
app.use('/subservice', userValidate, require('./Routes/subservice'));
app.use('/memberForm', userValidate, require('./Routes/memberForm'));
app.use('/designation', userValidate, require('./Routes/designation'));
app.use('/galleryMaster', userValidate, require('./Routes/galleryMaster'));
app.use('/holidaysListMaster', userValidate, require('./Routes/holidayListMaster'));
app.use('/leadSourceMaster', userValidate, require('./Routes/leadSourceMaster'));
app.use('/taxMaster', userValidate, require('./Routes/taxMaster'));
app.use('/hrPolicyMaster', userValidate, require('./Routes/hrPolicyMaster'));
app.use('/budgetingMaster', userValidate, require('./Routes/budgetingMaster'));
app.use('/templateMaster', userValidate, require('./Routes/templateMaster'));
app.use('/expenseMaster', userValidate, require('./Routes/expenseMaster'));
app.use('/invoice', userValidate, require('./Routes/Invoice'));
app.use('/emailsms', userValidate, require('./Routes/emailSender'));
app.use('/memberCallReport', userValidate, require('./Routes/memberCallReport'));
app.use('/allProductListingMaster', userValidate, require('./Routes/allProductListingMaster'));
app.use('/inventoryListingMaster', userValidate, require('./Routes/inventoryListingMaster'));
app.use('/shiftTimeSchedule', userValidate, require('./Routes/shiftTimeSchedule'));
app.use('/stockOrderList', userValidate, require('./Routes2/StockOrder/StockOrderList'));
app.use('/stockorderlist-status-received-stock', userValidate, require('./Routes2/StockOrder/StockOrderListReport'));
app.use('/sockreport', userValidate, require('./Routes2/StockOrder/StockReport'));
app.use('/empCheckIn', userValidate, require('./Routes/empCheckIn'));
app.use('/salarySheet', userValidate, require('./Routes/salarySheet'));
app.use('/jobProfile', userValidate, require('./Routes/jobProfile'))
app.use('/empJoining', userValidate, require('./Routes/empJoining'))
app.use('/emplDocument', userValidate, require('./Routes/emplDocument'))
app.use('/trainerSalarySlip', userValidate, require('./Routes/trainerSalarySlip'))
app.use('/employeePerformance', userValidate, require('./Routes/employeePerformance'))
app.use('/trainerPerformance', userValidate, require('./Routes/trainerPerformance'))

app.use('/leaveSetUpMaster', userValidate, require('./Routes/leaveSetUpMaster'))
app.use('/sendMultipalMail', userValidate, require('./Routes/sendMultiPalMail'))
app.use('/marketingEM', userValidate, require('./Routes2/MarketingEC/marketingEM'))
app.use('/marketingContact',userValidate,require('./Routes2/MarketingEC/marketingContact'))
app.use('/tcClientCertificate', userValidate, require('./Routes/tcClientCertificate'))
app.use('/ttcVideo', userValidate, require('./Routes/ttcVideo'))
app.use('/productInvoice', userValidate, require('./Routes/productInvoice'))
app.use('/ttcPDFDetails', userValidate, require('./Routes/ttcPDFDetails'))
app.use('/empleaveList', userValidate, require('./Routes/empleaveList'))
app.use('/allRight', require('./AllRight/allRightRoute'))
app.use('/center-partner', userValidate, require('./Master/CenterPartner/centerPartnerRoute'))
app.use('/employeeForm', userValidate, require('./Routes/employeeForm'))
app.use('/clientSupport', userValidate, require('./NewRoutes/clientSupport'))
app.use('/upgradeCalls', userValidate, require('./NewRoutes/upgradeCalls'))
app.use('/crosssaleCalls', userValidate, require('./NewRoutes/crosssaleCalls'))
app.use('/renewalsCalls', userValidate, require('./NewRoutes/renewalsCalls'))
app.use('/employeeTargetSheet', userValidate, require('./NewRoutes/employeeTargetSheet'))
app.use('/callsTarget', userValidate, require('./NewRoutes/callsTarget'))
app.use('/clientTarget', userValidate, require('./NewRoutes/clientTarget'))
app.use('/salesTarget', userValidate, require('./NewRoutes/salesTarget'))
app.use('/leadsTarget', userValidate, require('./NewRoutes/leadsTarget'))
app.use('/renewalsTarget', userValidate, require('./NewRoutes/renewalsTarget'))
app.use('/referralsLeadstarget', userValidate, require('./NewRoutes/referralsLeadstarget'))
app.use('/mediaTarget', userValidate, require('./NewRoutes/mediaTarget'))
app.use('/allDietClient', userValidate, require('./NewRoutes/allDietClient'))
app.use('/dietPlanTempLate', userValidate, require('./NewRoutes/dietPlanTempLate'))
app.use('/callender', userValidate, require('./NewRoutes/calender'))
app.use('/stockAssigning', userValidate, require('./NewRoutes/stockAssigning'))
app.use('/impCallList', userValidate, require('./NewRoutes/impCallList'))
app.use('/allSupplierList', userValidate, require('./NewRoutes/allSupplierList'))
app.use('/guestList', userValidate, require('./NewRoutes/guestList'))
app.use('/dailyExpence', userValidate, require('./NewRoutes/dailyExpence'))
app.use('/pettyCash', userValidate, require('./NewRoutes/pettyCash'))
app.use('/packageMaster', userValidate, require('./Routes/packageMaster'))
app.use('/leadDashBoard', userValidate, require('./DashBoard/leads'))
app.use('/serviceOverview', userValidate, require('./DashBoard/serviceOverview'))
app.use('/serviceActivity', userValidate, require('./DashBoard/serviceActivity'))
app.use('/attendanceActivity', userValidate, require('./DashBoard/attendanceActivity'))
app.use('/serviceActivity', userValidate, require('./DashBoard/serviceActivity'))
app.use('/income', userValidate, require('./DashBoard/Income'))
app.use('/profite', userValidate, require('./DashBoard/profite'))
app.use('/dailyTarget', userValidate, require('./DashBoard/EmpDashBoard/dailyTarget'))
app.use('/emp-attendance', userValidate, require('./DashBoard/EmpDashBoard/empAttendance'))
app.use('/appointment', userValidate, require('./NewRoutes/appointment'))
app.use('/typeOfCall', userValidate, require('./NewRoutes/typeOfCall'))
app.use('/clientDocument', userValidate, require('./NewRoutes/clientDocument'))
app.use('/tncMaster', userValidate, require('./NewRoutes/tncMaster'))
app.use('/cancelInvoiceReport',userValidate,require('./NewRoutes/cancelInvoiceReport'))
app.use('/center-invoice-setup',userValidate,require('./NewRoutes/invoiceMaster'))
app.use('/staffAttendanceWorkReport',userValidate,require('./NewRoutes/staffAttendanceWorkReport'))
app.use('/batchCategory',userValidate,require('./NewRoutes/batchCategory'))
app.use('/eventDetails',userValidate,require('./NewRoutes/event'))
app.use('/bookingEvent',userValidate,require('./NewRoutes/bookingEvent'))
app.use('/search-filter',userValidate,require('./SearchFilter/SearchFilter'))
app.use('/notification', require('./Routes/notification'))

// const notificationSchema2 = require('./notification/notification')
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer, { });

//admin router
io.on('connection', (socket) => {
    console.log('A user connected');
      socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

const activeServerConection = ()=>{
    //    const Server = socketio.Server

 app.listen(port,()=>{
        console.log(port)
       }) 

    //    console.log(serve)
       

    //    const io = new Server(htServer, {
    //     cors: {
    //         origin: "*",
    //         methods: ["GET", "POST"],
    //         transports: ['websocket', 'polling'],
    //         credentials: true
    //     },
    //     allowEIO3: true,
    //     // allowEIO4: true,
    // });


// io.on("connection", (socket) => {
//      console.log('connected')

//      socket.on('disconnect', () => {
//         console.log('User disconnected');
//       });
    
//       socket.on('notification', (message) => {
//         io.emit('notification', message); // Broadcast the message to all connected clients
//       });
//   });

       
    //   io.listen(htServer);


//         io.sockets.on('connection', async (socket) => {
//         console.log('Client connected');
        
//     //    const data = await   notificationSchema2.find({})
//         //   .sort({ timestamp: -1 })
//         //   .limit(10) // Adjust the limit as needed
//         //   .exec((err, notifications) => {
//         //     if (err) {
//         //       console.error(err);
//         //     } else {
//             //   socket.emit('latestNotifications', data);
//         //     }
//         //   });
      
//          socket.on('disconnect', () => {
//           console.log('Client disconnected');
//         });

//   Handle the creation of a new notification
 

// });

}




    
    // const httpsServer = https.createServer({
    //     key: fs.readFileSync(path.resolve('dist/ssl/keys/server.key')),
    //     cert: fs.readFileSync(path.resolve('dist/ssl/keys/server.crt'))
    //   });

 




// }

const adminRoute = require('./Routes/shift-time')
app.use('/', adminRoute)

mongoose.set("strictQuery", false)
mongoose.connect('mongodb+srv://syedabdullahali380:DK6sgxA4opfDYt07@cluster0.d3znm5l.mongodb.net/')
    .then(() => {
        activeServerConection()
    }).catch((error) => {
        console.log(error)
    })

