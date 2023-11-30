import express from "express";
//--
import AuthMiddle from '../Middlewares/Auth.js'
import { create, getOne, getTickets } from "../Controllers/Tickets.js";
//--
const router = express.Router();
//--
router.route('/').post(AuthMiddle, create).get(AuthMiddle, getTickets);
router.route('/:id').get(AuthMiddle, getOne)
//--
export default router