import menuModel from '../Models/Menu.js'
import courseModel from '../Models/Course.js'

const create = async (req, res, next) => {
    try {
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
    } catch (error) {
        next(error)
    }
}

const getAll = async (req, res, next) => {
    try {


        const getAll = await menuModel.find({}).lean();
        const courses = await courseModel.find({}, 'name href categoryID').lean();
        if (getAll) {

            getAll.forEach(menu => {
                menu.subMenus = [];
                courses.forEach(course => {
                    if (menu?.categoryID?.equals(course.categoryID)) {
                        menu.subMenus.push(course)
                    }
                })
            })

            res.status(200).json(getAll)

        } else {
            res.status(404).json({
                message: "Error In Receiving Menus"
            })
        }
    } catch (error) {
        next(error)
    }
}
export {
    create,
    getAll
}