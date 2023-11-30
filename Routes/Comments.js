import express from "express";
//--
import AuthMiddle from '../Middlewares/Auth.js'
import { create, getMainCommnets, gteComments } from '../Controllers/Comment.js'

//--
const router = express.Router();
//--
router.route('/').post(AuthMiddle, create);
router.route('/:href/:limit').get(gteComments);
router.route('/main').get(getMainCommnets);
//--
export default router;