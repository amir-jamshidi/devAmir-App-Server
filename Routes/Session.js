import express from "express";
//--
import AuthMiddle from '../Middlewares/Auth.js'
import optionalAuthMiddle from '../Middlewares/OptionalLogin.js'
import IsAdminMiddle from '../Middlewares/IsAdmin.js'
import { create, createMeeting, getMeeting } from "../Controllers/Session.js";
import multer from "multer";
import uploaderMiddle from '../Uploads/MulterConfig.js'
//--
const router = express.Router();
//--
router.route('/').post(AuthMiddle, IsAdminMiddle, create)
router.route('/meetings').post(AuthMiddle, IsAdminMiddle, multer({ storage: uploaderMiddle, limits: { fileSize: 1000000000 } }).single('video'), createMeeting)
router.route('/meetings/:href').get(optionalAuthMiddle, getMeeting)
//--
export default router;
