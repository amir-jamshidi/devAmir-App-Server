


import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
//--
import userModel from '../Models/User.js'
import banUserModel from '../Models/Bans.js'
import ticketsModel from '../Models/Tickets.js'
import courseRegister from '../Models/CourseRegister.js'
import registerValidator from '../Validators/RegisterValidate.js'
import converToPersian from '../Utils/PersianDate.js'

//--
const register = async (req, res, next) => {

    try {
        const { email, phone, password } = req.body

        const phoneRegex = /^09[\d]{9}$/

        if (!phoneRegex.test(phone)) {
            return res.status(409).json({
                message: "The Phone Number Format Is Not Correct"
            })
        }
        //Validate
        const registerValidate = registerValidator(req.body);

        if (registerValidate !== true) {
            return res.status(422).json(registerValidate);
        }

        //Check Exist User
        const checkExistUser = await userModel.find({
            $or: [{ email }, { phone }]
        }).lean()
        if (checkExistUser.length > 0) {
            return res.status(409).json({
                message: "Duplicate Email Or Phone Number"
            })
        }


        //Ceck Ban User
        const isBanUser = await banUserModel.find({
            $or: [{ email }, { phone }]
        }).lean()
        if (isBanUser.length > 0) {
            return res.status(409).json({
                message: "Your Email Or Phone Number Has Been Blocked"
            })
        }

        //Check Users Count 
        const userCount = await userModel.find({}).count();

        //Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create User Model And Register
        const newUser = await userModel.create({
            email,
            phone,
            fullname: email.split('@')[0],
            password: hashedPassword,
            role: userCount === 0 ? "ADMIN" : "USER",
            profile: 'user.png'
        });

        //Delete PassWord From User Model
        const newUserModelFilter = newUser.toObject();
        Reflect.deleteProperty(newUserModelFilter, 'password');

        //Create Access Token
        const accessToken = jwt.sign({ id: newUser._id }, process.env.JWTSECRET, { expiresIn: '15 day' });

        //Send Response
        res.status(201).json({ user: newUserModelFilter, accessToken });

    } catch (error) {
        next(error);
    }
}
const login = async (req, res, next) => {

    try {
        const { identifire, password } = req.body;

        //Check Has User


        const isHasUser = await userModel.findOne({
            $or: [{ email: identifire }, { phone: identifire }]
        })
        if (!isHasUser) {
            return res.status(404).json({
                message: "There Is No User With This Email Or Phone Number"
            })
        }

        //Check Password
        const isPasswordValid = await bcrypt.compare(password, isHasUser.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "The Password Is Wrong"
            })
        }

        // Delete Pass In Object
        const userLogin = isHasUser.toObject();
        Reflect.deleteProperty(userLogin, 'password');

        //Create AccessToken
        const accessToken = jwt.sign({ id: isHasUser._id }, process.env.JWTSECRET, { expiresIn: "15 day" });
        return res.status(200).json({ user: userLogin, accessToken });

    } catch (error) {
        next(error)
    }
}
const getMe = async (req, res, next) => {
    try {

        res.status(200).json(
            { user: req.user }
        )
    } catch (error) {
        next(error)
    }
}
const editProfile = async (req, res, next) => {
    try {
        const { fullname } = req.body
        const userProfile = await userModel.findOneAndUpdate({ _id: req.user._id }, { fullname });
        if (userProfile) {
            res.status(200).json({ message: "Edit Profile Success" })
        }
    } catch (error) {
        next(error)
    }
}
const editProfileImage = async (req, res, next) => {
    try {
        const user = await userModel.findOneAndUpdate({ _id: req.user._id }, { profile: req.file.filename })
        if (user) {
            res.status(200).json({ message: 'Change Profile Success' });
        }
    } catch (error) {
        next(error);
    }
}
const getDashboard = async (req, res , next) => {

    try {
        const ticketsCount = await ticketsModel.find({ creatorID: req.user._id }).count().lean();
        const coursesCount = await courseRegister.find({ userID: req.user._id }).count().lean();
        const tickets = await ticketsModel.find({ creatorID: req.user._id }).limit(3).sort({ _id: -1 }).lean();
        const courses = await courseRegister.find({ userID: req.user._id }).populate('courseID').limit(3).sort({ _id: -1 }).lean();

        courses.forEach(course => {
            course.createdAt = converToPersian(course.createdAt);
        })

        res.status(200).json({
            ticketsCount,
            coursesCount,
            tickets,
            courses
        })
    } catch (error) {
        next(error);
    }
}

export {
    register,
    login,
    getMe, editProfile, editProfileImage, getDashboard
}
