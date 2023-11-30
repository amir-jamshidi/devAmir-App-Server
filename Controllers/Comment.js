import commentModel from '../Models/Comment.js'
import courseModel from '../Models/Course.js'
import converToPersian from '../Utils/PersianDate.js';

const create = async (req, res) => {


    const { body, courseID, score } = req.body;
    const comment = await commentModel.create({
        body, courseID, score, creatorID: req.user._id, isShow: 0
    });
    if (comment) {
        res.status(201).json(comment);
    }

}
const gteComments = async (req, res) => {

    const { href, limit } = req.params;


    const course = await courseModel.findOne({ href }).lean();
    if (!course) {
        return res.status(421).json({ message: 'Course Not Found' });
    }
    const comments = await commentModel.find({ courseID: course._id }).sort({ _id: -1 }).limit(limit).populate('creatorID', 'fullname role  profile').lean();



    //Convert Date 
    comments.forEach(comment => {
        comment.createdAt = converToPersian(comment.createdAt);
    })

    if (comments.length > 0) {
        return res.status(200).json(comments);
    }

}
const getMainCommnets = async (req, res) => {
    const comments = await commentModel.find({ score: 5 }).sort({ _id: -1 }).populate('creatorID').populate('courseID', 'href name').limit(8).lean();
    res.status(200).json(comments)
}
export {
    create,
    gteComments,
    getMainCommnets
}