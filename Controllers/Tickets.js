import ticketsModel from '../Models/Tickets.js'
import converToPersian from './../Utils/PersianDate.js';

const create = async (req, res) => {
    const { body, priority } = req.body;
    const ticket = await ticketsModel.create({ body, priority, creatorID: req.user._id });
    if (ticket) {
        res.status(201).json(ticket)
    }
}

const getTickets = async (req, res) => {
    const tickets = await ticketsModel.find({ creatorID: req.user._id }).sort({ _id: -1 }).lean();
    if (tickets) {
        res.status(200).json(tickets)
    }
}

const getOne = async (req, res) => {
    const { id } = req.params;
    const ticket = await ticketsModel.findOne({ _id: id, creatorID: req.user._id }).lean();
    if (ticket) {
        ticket.createdAt = converToPersian(ticket.createdAt);
        res.status(200).json(ticket)
    }
}
export {
    create,
    getTickets,
    getOne
}