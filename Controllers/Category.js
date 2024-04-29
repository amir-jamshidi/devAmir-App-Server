import categoryModel from '../Models/Category.js'

const create = async (req, res, next) => {
    try {
        const { name, href } = req.body;
        const category = await categoryModel.create({
            name,
            href
        })

        if (category) {
            res.status(201).json(category);
        } else {
            res.status(400).json({
                message: "Error Adding Category"
            })
        }
    } catch (error) {
        next(error)
    }

}
const remove = async (req, res, next) => {
}
const update = async (req, res) => {
}
const getAll = async (req, res, next) => {
    try {
        const categories = await categoryModel.find({}).lean();
        console.log(categories);
        if (categories) {
            res.status(200).json(categories);
        }
    } catch (error) {
        next(error)
    }
}
const getCategoryMap = async (req, res, next) => {
    try {


        const categories = await categoryModel.find({}).limit(4).lean();
        if (categories) {
            res.status(200).json(categories);
        }
    } catch (error) {
        next(error)
    }
}
const getOne = async (req, res, next) => {
    try {
        const { href } = req.params;
        const category = await categoryModel.findOne({ href });
        if (category) {
            res.status(200).json(category);
        }
    } catch (error) {
        next(error)
    }

}

export {
    create,
    remove,
    update,
    getAll,
    getCategoryMap,
    getOne

}
