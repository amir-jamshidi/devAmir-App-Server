import menuModel from '../Models/Menu.js'

const create = async (req, res) => {
    const { title, href, isSub, parent } = req.body;
    const menu = await menuModel.create({ title, href, isSub, parent });
    if (menu) {
        return res.status(201).json({
            message: "The Menu Was Created Successfully"
        })
    } else {
        return res.status(404).json({
            message: "Error Creating Menu"
        })
    }
}

const getAll = async (req, res) => {
    const getAll = await menuModel.find({}).lean();
    if (getAll) {
        res.status(200).json(getAll)
    } else {
        res.status(404).json({
            message: "Error In Receiving Menus"
        })
    }
}
export {
    create,
    getAll
}