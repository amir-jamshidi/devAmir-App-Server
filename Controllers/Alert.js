import alertModel from "../Models/Alert.js";



const getAll = async (req, res, next) => {
    try {
        const allAlert = await alertModel.find({ isShow: 1 }).populate('creator', 'fullname').lean();
        if (allAlert) {
            res.status(200).json(allAlert)
        }
    } catch (error) {
        next(error);
    }
}


const insetAlert = async (req, res, next) => {
    try {
        const { title, body, btn, color, isShow, href } = req.body
        const newAlert = await alertModel.create({
            title, body, btn, color, isShow, href, creator: req.user._id
        });
        if (newAlert) {
            res.status(201).json({
                code: 201,
                alert: newAlert
            })
        }
    } catch (error) {
        next(error)
    }

}

export {
    getAll,
    insetAlert
}
