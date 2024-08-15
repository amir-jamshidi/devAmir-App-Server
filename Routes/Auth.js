
import express from "express";
import multer from "multer";
//--
import { register, login, getMe, editProfile, editProfileImage, getDashboard } from '../Controllers/Auth.js'

import AuthMiddle from '../Middlewares/Auth.js'
import uploaderMiddle from '../Uploads/MulterConfig.js'
//--
const router = express.Router();
//--
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/me').get(AuthMiddle, getMe);
router.route('/update').put(AuthMiddle, editProfile);
router.route('/profile').put(AuthMiddle, multer({ storage: uploaderMiddle, limits: { fileSize: 100000000 } }).single('profile'), editProfileImage)
router.route('/dashboard').get(AuthMiddle, getDashboard)
//--
export default router 
