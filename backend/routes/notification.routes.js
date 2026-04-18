import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js';
import { deleteNotifications, getNotications } from '../controllers/notification.controller.js';

const router = express.Router();
router.get("/", protectRoute, getNotications)
router.delete("/", protectRoute, deleteNotifications)


export default router