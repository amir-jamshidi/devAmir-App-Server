import express from "express";
//--
import { create, getAll, getCategoryMap, getOne } from "../Controllers/Category.js";
import AuthMiddle from '../Middlewares/Auth.js'
import isAdminMiddle from '../Middlewares/IsAdmin.js'
//--
const router = express.Router();
//--

router.route('/')
    .post(AuthMiddle, isAdminMiddle, create)
    .get(AuthMiddle, isAdminMiddle, getAll);
router.route('/map')
    .get(getCategoryMap)
router.route('/:href')
    .get(getOne)
//--
export default router