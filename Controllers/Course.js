import courseModel from '../Models/Course.js'
import sessionModel from '../Models/Session.js'
import meetingModel from '../Models/Meeting.js'
import courseRegisterModel from '../Models/CourseRegister.js'
import converToPersian from '../Utils/PersianDate.js'
import commentModel from '../Models/Comment.js'

const create = async (req, res, next) => {
    try {
        const { name, description, categoryID, isFree, price, discount, support, prerequisite, status, time, href } = req.body;
        const course = await courseModel.create({
            name, description, href, creatorID: req.user._id, categoryID, isFree, price, discount, cover: req.file.filename, time, score: 5
            , meetingsCount: 0, support, prerequisite, status
        });
        if (course) {
            res.status(201).json(course);
        }
    } catch (error) {
        next()
    }
}

const getAll = async (req, res, next) => {

    try {
        const { sort } = req.params

        let allCourses = []

        switch (sort) {
            case 'all': {
                allCourses = await courseModel.find({}).sort({ _id: -1 }).populate('creatorID', 'fullname').populate('categoryID').lean();
                break
            }
            case 'inexpensive': {
                allCourses = await courseModel.find({}).sort({ price: 1 }).populate('creatorID', 'fullname').populate('categoryID').lean();

                break
            }
            case 'expensive': {
                allCourses = await courseModel.find({}).sort({ price: -1 }).populate('creatorID', 'fullname').populate('categoryID').lean();

                break
            }
            case 'popular': {
                allCourses = await courseModel.find({}).sort({ sellCount: -1 }).populate('creatorID', 'fullname').populate('categoryID').lean();

                break
            }
            default: {
                allCourses = await courseModel.find({}).sort({ _id: -1 }).populate('creatorID', 'fullname').populate('categoryID').lean();

            }
        }


        if (allCourses) {
            return res.status(200).json(allCourses)
        }
    } catch (error) {
        next()
    }
}

const getLastedCourses = async (req, res, next) => {
    try {
        const lastedCourses = await courseModel.find({}).populate('creatorID', 'fullname').populate('categoryID').sort({ _id: -1 }).limit(4).lean();
        if (lastedCourses) {
            return res.status(200).json(lastedCourses)
        }
    } catch (error) {

    }
}

const getPopularCourses = async(req, res, next) => {
    try {
        const popularCourses = await courseModel.find({}).sort({ score: -1 }).populate('creatorID', 'fullname').populate('categoryID').limit(8).lean();
        if (popularCourses) {
            res.status(200).json(popularCourses)
        }
    } catch (error) {
        next()
    }
}

const getBestSellerCourses = async (req, res) => {
    const bestSellerCourses = await courseModel.find({}).sort({ sellCount: -1 }).populate('creatorID', 'fullname').populate('categoryID').limit(8).lean();
    if (bestSellerCourses) {
        res.status(200).json(bestSellerCourses)
    }
}

const getOne = async (req, res) => {

    const { href } = req.params;
    const course = await courseModel.findOne({ href }).populate('creatorID', 'fullname profile').populate('categoryID').lean();
    if (!course) {
        return res.status(421).json({ message: 'Course Not Found' })
    }
    const sessions = await sessionModel.find({ courseID: course._id }).lean();
    const meetings = await meetingModel.find({ courseID: course._id })

    sessions.forEach(session => {
        session.meetings = [];
        meetings.forEach(metting => {

            if (session._id.equals(metting.sessionID)) {
                session.meetings.push(metting);
            }

        })
    })


    if (course) {

        course.createdAt = converToPersian(course.createdAt);
        course.updatedAt = converToPersian(course.updatedAt);
        course.time = Math.round(Number(course.time) / 60);
        const commentsCount = await commentModel.find({ courseID: course._id }).count().lean();
        course.commentsCount = commentsCount;

        if (req.user === null) {
            course.accessToCourse = false;
        } else {
            const isRegisterToCourse = await courseRegisterModel.findOne({ courseID: course._id, userID: req.user._id })
            if (isRegisterToCourse) {
                course.accessToCourse = true;
            } else {
                course.accessToCourse = false;
            }
        }

        course.sessions = sessions;
        res.status(200).json(course);
    }
}

const registerCourse = async (req, res) => {

    const { href } = req.params
    const { price } = req.body
    const course = await courseModel.findOne({ href });
    if (!course) {
        return res.status(421).json({ message: 'Course Not Found' })
    }
    const courseRegister = await courseRegisterModel.create({
        courseID: course._id,
        userID: req.user._id,
        price,
        orderNumber: String(Date.now() + Math.floor(Math.random() * 100000))
    })
    if (courseRegister) {
        await courseModel.findOneAndUpdate({ _id: course._id }, { $inc: { sellCount: +1 } });
        res.status(201).json({
            message: "Registration Is Success"
        });
    }

}

const getByCategoryID = async (req, res) => {
    const { categoryID, sort } = req.params;

    try {
        let courses = [];
        switch (sort) {
            case 'all': {
                courses = await courseModel.find({ categoryID }).sort({ _id: -1 }).limit(12).populate('creatorID', 'fullname').populate('categoryID').lean();
                break
            }
            case 'inexpensive': {
                courses = await courseModel.find({ categoryID }).sort({ price: 1 }).limit(12).populate('creatorID', 'fullname').populate('categoryID').lean();
                break
            }
            case 'expensive': {
                courses = await courseModel.find({ categoryID }).sort({ price: -1 }).limit(12).populate('creatorID', 'fullname').populate('categoryID').lean();
                break
            }
            case 'popular': {
                courses = await courseModel.find({ categoryID }).sort({ sellCount: -1 }).limit(12).populate('creatorID', 'fullname').populate('categoryID').lean();
                break
            }
            default: {
                courses = await courseModel.find({ categoryID }).sort({ _id: -1 }).limit(12).populate('creatorID', 'fullname').populate('categoryID').lean();
            }
        }
        res.status(200).json(courses);
    } catch (error) {


        console.log(error)

    }
}

const searchCourses = async (req, res) => {
    const { value, sort } = req.params;


    let courses = [];


    switch (sort) {
        case 'all': {
            courses = await courseModel.find({
                name: { $regex: '.*' + value + '.*' }
            }).sort({ _id: -1 }).populate('creatorID', 'fullname').populate('categoryID').lean(); res.status(200).json(courses)
            break
        }
        case 'inexpensive': {
            courses = await courseModel.find({
                name: { $regex: '.*' + value + '.*' }
            }).sort({ price: 1 }).populate('creatorID', 'fullname').populate('categoryID').lean(); res.status(200).json(courses)
            break
        }
        case 'expensive': {
            courses = await courseModel.find({
                name: { $regex: '.*' + value + '.*' }
            }).sort({ price: -1 }).populate('creatorID', 'fullname').populate('categoryID').lean(); res.status(200).json(courses)

            break
        }
        case 'popular': {
            courses = await courseModel.find({
                name: { $regex: '.*' + value + '.*' }
            }).sort({ sellCount: -1 }).populate('creatorID', 'fullname').populate('categoryID').lean(); res.status(200).json(courses)
            break
        }
        default: {
            courses = await courseModel.find({
                name: { $regex: '.*' + value + '.*' }
            }).sort({ _id: -1 }).populate('creatorID', 'fullname').populate('categoryID').lean(); res.status(200).json(courses)

        }
    }


}

const getMyCourses = async (req, res) => {
    const courses = await courseRegisterModel.find({ userID: req.user._id }).populate('courseID').lean();
    if (courses) {
        courses.forEach(course => {
            course.createdAt = converToPersian(course?.createdAt)
        })
        res.status(200).json(courses);
    }
}

export {
    create,
    getAll,
    getLastedCourses,
    getPopularCourses,
    getBestSellerCourses,
    getOne,
    registerCourse,
    getByCategoryID,
    searchCourses,
    getMyCourses
}