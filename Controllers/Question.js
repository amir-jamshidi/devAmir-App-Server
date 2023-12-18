import questionModel from '../Models/Question.js'
import courseModel from '../Models/Course.js'
import courseRegisterModel from '../Models/CourseRegister.js'
import converToPersian from '../Utils/PersianDate.js';
import mongoose from 'mongoose';

const create = async (req, res, next) => {
    try {
        const { courseID, body } = req.body
        const question = await questionModel.create({
            creatorID: req.user._id,
            courseID,
            body
        });
        if (question) {
            res.status(201).json(question)
        }
    } catch (error) {
        next(error)
    }
}

const getQuestion = async (req, res, next) => {

    try {
        const { courseID } = req.params;

        if (!mongoose.Types.ObjectId.isValid(courseID)) {
            return res.status(421).json({ message: 'InValidDatat' })
        }

        const questions = await questionModel.find({ creatorID: req.user._id, courseID }).sort({ _id: -1 }).lean();
        const course = await courseModel.findOne({ _id: courseID }).lean();
        const isRegisterToCourse = await courseRegisterModel.findOne({ courseID, userID: req.user._id }).lean();

        if (!course) {
            return res.status(403).json({ message: 'Not Found Questions' })
        }

        course.isRegisterToCourse = isRegisterToCourse ? true : false

        if (!isRegisterToCourse) {
            return res.json({ course, questions: [] })
        }

        if (questions) {
            questions.forEach(question => {
                question.createdAt = converToPersian(question.createdAt);
            })
            res.status(200).json({ course, questions });
        }
    } catch (error) {
        next(error);
    }
}

const getOne = async (req, res, next) => {
    try {
        const { questionID } = req.params;
        if (!mongoose.Types.ObjectId.isValid(questionID)) {
            return res.status(421).json({ message: "InvalidData" })
        }
        const question = await questionModel.findOne({ _id: questionID, creatorID: req.user._id }).lean();

        if (!question) {
            return res.status(404).json({ message: "Not Found " })
        }
        question.createdAt = converToPersian(question.createdAt)
        res.status(200).json(question);
    } catch (error) {
        next(error)
    }

}

export {
    create,
    getQuestion,
    getOne
}