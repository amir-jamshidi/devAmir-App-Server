import express from "express";
//
import authMiddle from '../Middlewares/Auth.js'
import isAdminMiddle from '../Middlewares/IsAdmin.js'
import { create } from '../Controllers/Bans.js';
//
const router = express.Router()
//
router.route('/').post(authMiddle, isAdminMiddle, create);
//
export default router