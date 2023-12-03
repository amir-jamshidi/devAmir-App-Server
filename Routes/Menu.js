import express from "express";
//--
import { create, getAll } from '../Controllers/Menu.js'
import AuthMiddle from '../Middlewares/Auth.js'
import IsAdminMiddle from '../Middlewares/IsAdmin.js'
//--
const router = express.Router();
//--
router.route('/').post(AuthMiddle, IsAdminMiddle, create).get(getAll)
//--
export default router