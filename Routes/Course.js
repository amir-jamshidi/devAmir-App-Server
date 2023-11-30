import express from "express";
import multer from 'multer';
//--
import { getAll, create, getLastedCourses, getPopularCourses, getBestSellerCourses, getOne, searchCourses, registerCourse, getByCategoryID, getMyCourses } from '../Controllers/Course.js'
import AuthMiddle from '../Middlewares/Auth.js'
import OptionalAuthMiddle from '../Middlewares/OptionalLogin.js'
import IsAdminMiddle from '../Middlewares/IsAdmin.js'
import uploaderMiddle from '../Uploads/MulterConfig.js';
//--
const router = express.Router();
//--

router.route('/all/:sort').get(getAll)
router.route('/me').get(AuthMiddle, getMyCourses)
router.route('/').post(AuthMiddle, IsAdminMiddle, multer({ storage: uploaderMiddle, limits: { fileSize: 100000000 } }).single('cover'), create)
router.route('/lasted').get(getLastedCourses)
router.route('/popular').get(getPopularCourses);
router.route('/bestseller').get(getBestSellerCourses);
router.route('/:href').get(OptionalAuthMiddle, getOne);
router.route('/:href/register').post(AuthMiddle, registerCourse);
router.route('/category/:categoryID/:sort').get(getByCategoryID)
router.route('/search/:value/:sort').get(searchCourses)
export default router 