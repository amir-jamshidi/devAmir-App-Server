import banModel from '../Models/Bans.js'
import userModel from '../Models/User.js'
const create = async (req, res) => {
    const { userID } = req.body;

    const user = await userModel.findOne({ _id: userID });

    if (user) {
        const ban = await banModel.create({
            phone: user.phone,
            email: user.email
        })
        res.status(201).json(ban);
    }
}

export {
    create
}