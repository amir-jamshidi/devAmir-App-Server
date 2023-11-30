import express from "express";
import { create } from '../Controllers/Cooperation.js'
//--
const router = express.Router();
//--
router.route('/').post(create)
//--
export default router