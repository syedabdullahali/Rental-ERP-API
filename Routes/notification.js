const express = require("express");
const router = express.Router();
const Notification = require("../notification/notification");
// const { io } = require(" to be added");
const notification = require("../notification/notification");

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
// router.get("/all-notification", async (req, res) => {
//     try {
//     } catch {}
// });
// router.get("/notification", async (req, res) => {
//     try {
//     } catch {}
// });

module.exports = router;
