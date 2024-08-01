



import express from 'express'
//--
import { insetAlert, getAll } from '../Controllers/Alert.js'
import AuthMiddle from '../Middlewares/Auth.js'
import IsAdminMiddle from '../Middlewares/IsAdmin.js'
//--
const alertRouter = express.Router();
//--
alertRouter.route('/')
    .get(getAll)
    .post(AuthMiddle, IsAdminMiddle, insetAlert);

export default alertRouter

