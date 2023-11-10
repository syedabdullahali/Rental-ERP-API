const express = require("express");
const router = express.Router();
const Notification = require("../notification/notification");
// const { io } = require(" to be added");
const notification = require("../notification/notification");
const nodemailer = require("nodemailer");
const axios = require('axios');
// Function for mail 
function mailFunction(email) {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD,
        },
    });

    let mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: email,
        subject: "//////// SUBJECT ///////////////",
        text: `     Hello,
      ////////////// Content ?? ??//////////////////
              `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return { error: error };
        } else {
            console.log("Email sent: " + info.response);
            return resp.json({ success: true, message: info.response });
        }
    });
}

// Create a notification
router.post("/notifications", async (req, res) => {
    try {
        const task = await Notification.create({
            ...req.body,
        });
        // io.emit("Notifications", task);

        res.status(200).json({
            success: true,
            response: task,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message,
        });
    }
});

// Update a notification
router.put("/notifications", async (req, res) => {
    try {
        const updatedTask = await Notification.findByIdAndUpdate(
            req.headers.id,
            req.body,
            { new: true }
        );
        if (!updatedTask) {
            res.status(404).json({
                success: false,
                response: "Invalid Notification Id",
            });
        }
        // io.emit("Notifications", updatedTask);

        res.status(200).json({
            success: true,
            response: updatedTask,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message,
        });
    }
});

// Delete a notification
router.delete("/notifications", async (req, res) => {
    try {
        const deletedNotification = await Notification.findByIdAndRemove(
            req.headers.id
        );
        if (!deletedNotification) {
            res.status(404).json({
                success: false,
                response: "Invalid Notification Id",
            });
        }
        // We have to sent notification on delete ?
        //io.emit("Notifications", deletedNotification);

        res.status(200).json({
            success: true,
            response: deletedNotification,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message,
        });
    }
});

// Get all notification till now
// Dose we have to get all notifications for perticular id?
router.get("/notifications/filter-by-employee/", async (req, res) => {
    try {
        const { employeeId } = req.query;
        const getNotification = await Notification.find({
            empLoyeeId: employeeId,
        });
        if (!getNotification) {
            res.status(404).json({
                success: false,
                response: "Invalid Employee Id",
            });
        }
        res.status(200).json({
            success: true,
            response: getNotification,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message,
        });
    }
});

router.get("/notifications/filter-by-admin/", async  (req, res) =>{
    try {
        const partnerAdminMongoId = req.query.partnerAdminMongoId;
        const getNotification = await Notification.find({
            partnerAdminMongoId: partnerAdminMongoId,
        });
        if (!getNotification) {
            res.status(404).json({
                success: false,
                response: "Invalid Employee Id",
            });
        }
        res.status(200).json({
            success: true,
            response: getNotification,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message,
        });
    }
});

router.post("/send-sms", async (req, res) =>{
    try{
        const body = {
            SenderId:"YOGPIF",
            Is_Unicode:"false",
            Is_Flash:"false",
            Message: "We received your inquiry for Yoga , Weight Loss with Yogic Management program, Ttc courses. We'd be happy to help with the details and guides YOGPOWER",
            MobileNumbers : req.body.mobileNumber,
            ApiKey : process.env.ApiKey,
            ClientId: process.env.ClientId,
        }
        apiURL="http://164.52.205.46:6005/api/v2/SendSMS";

        axios.post(apiURL,body).then(response => {
            // Handle the response data
            console.log(response.data);
          })
          res.status(200).json({
            success: true,
        });

    } catch(err) {
        res.status(400).json({
            success: false,
            error: err.message,
        });
    }
})

// mail api for email array 
router.post("/mail", async (req, res) =>{
    try{
        const emails = req.body.emails;
        for(let i=0;i<emails.length ;i++) {
            mailFunction(emails[i]);
        }
        res.status(200).json({
            success: true,
        });
    }catch (err){
        res.status(400).json({
            success: false,
            error: err.message,
        });
    }
})


module.exports = router;
