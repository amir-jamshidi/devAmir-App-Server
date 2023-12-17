import sessionModel from '../Models/Session.js'
import meetingModel from '../Models/Meeting.js'
import courseRegisterModel from '../Models/CourseRegister.js'
import courseModel from '../Models/Course.js'

const create = async (req, res, next) => {
    try {
        const { name, time, courseID, isFree } = req.body;
        const session = await sessionModel.create({
            name, time, courseID, isFree
        })
        if (session) {
            res.status(201).json(session);
        }
    } catch (error) {
        next(error);
    }


}

const createMeeting = async (req, res, next) => {
    try {
        const { sessionID, courseID, name, time, isFree } = req.body
        const href = String(Date.now() + Math.floor(Math.random() * 100000));
        const meeting = await meetingModel.create({
            sessionID, courseID, name, time, video: req.file.filename, isFree, href
        })

        const mettingTime = Number(time.split(':')[0]);

        if (meeting) {
            await courseModel.findOneAndUpdate({ _id: courseID }, { $inc: { meetingsCount: +1, time: mettingTime } })
            res.status(201).json(meeting)
        }
    } catch (err) {
        next(err)
    }

}

const getMeeting = async (req, res, next) => {
    try {
        const { href } = req.params;
        const meeting = await meetingModel.findOne({ href })
        if (!meeting) {
            return res.status(404).json({ message: 'Not Found' })
        }
        const course = await courseModel.findOne({ _id: meeting.courseID });

        if (meeting && meeting.isFree === 1) {
            return res.status(200).json(meeting);
        }

        if (req.user === null) {
            return res.status(404).json({
                message: "You Do Not Have Access"
            })
        }

        const isRegisterToCourse = await courseRegisterModel.findOne({ userID: req.user._id, courseID: course._id });
        if (isRegisterToCourse) {
            return res.status(200).json(meeting);
        }

        res.status(404).json({
            message: "Not Found"
        })
    } catch (error) {
        next(err)
    }
}


export {
    create,
    createMeeting,
    getMeeting
}