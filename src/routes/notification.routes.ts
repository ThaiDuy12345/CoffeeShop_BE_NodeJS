import express from 'express';
import * as notificationController from '../controllers/notification.controller.js'
const routes = express.Router();
//get all notifications from a specific user
routes.get("/:id", notificationController.index)
//update read status of a specific notification
routes.put("/:id", notificationController.update)

export default routes