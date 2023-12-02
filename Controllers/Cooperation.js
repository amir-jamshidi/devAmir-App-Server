import cooperationModel from '../Models/Cooperation.js'

const create = async (req, res) => {
    const { fullname, email, phone, link, description } = req.body
    const cooperation = await cooperationModel.create({
        fullname, email, phone, link, description
    })
    if (cooperation) {
        res.status(200).json({ message: "Send Cooperation Success" });
    }
}
  
export {
    create
} 