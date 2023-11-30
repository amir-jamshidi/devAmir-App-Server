import express from "express";
import { create, getOne, getQuestion } from '../Controllers/Question.js'
import AuthMiddle from '../Middlewares/Auth.js'
//--
const router = express.Router();
//--
router.route('').post(AuthMiddle, create);
router.route('/:courseID').get(AuthMiddle, getQuestion);
router.route('/question/:questionID').get(AuthMiddle, getOne);
//--
export default router
