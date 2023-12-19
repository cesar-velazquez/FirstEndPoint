const { json } = require('sequelize');
const RepairsServices = require('./repairs.service');
const validateRepair = require('./repairs.Schema');

const GetAllRepairs = async (req, res) => {
    const NewRepair = await RepairsServices.GetAll();
    return res.status(200).json({
        message: 'Get',
        NewRepair
    })
}

const CreateRepair = async (req, res) => {
    try {
        const { hasError, errorMessages, userData } = validateRepair(req.body)

        if (hasError) {
            return res.status(422).json({
                status: 'error',
                message: errorMessages,
            })
        }
        const {date, motorsNumber, description, userid} = userData;
        const NewRepair = await RepairsServices.create({date, motorsNumber, description, userid});
        return res.status(200).json({
            message: 'Repair create successfully!',
            data: NewRepair 
        });
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'Something went very wrong! 💀',
            error,
        });
    }
}

const GetOneRepairs = async (req, res) => {
    const { id } = req.params;
    const findOneRepair = await RepairsServices.GetOne(id)
    if (!findOneRepair) {
        return res.status(404).json({
            status: "error",
            message: `The reparation with the id:${id} not found 🥴`
        })
    }
    return res.status(200).json({
        findOneRepair
    })
}

const PatchRepairs = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const NewStatus = await RepairsServices.GetOne(id)
        console.log(id)
        console.log("New: ", NewStatus)
        if (!NewStatus) {
            return res.status(404).json({
                // status: 'error',
                message: `The reparation with the id:${id} not found 🥴`
            })
        }
        const statusUpdated = await RepairsServices.UpdateRepair(NewStatus, {
            status
        })
        return res.status(200).json({
            message: "Status changed 😉",
            statusUpdated
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something went very wrong! 💀',
            error
        })
    }
}

const DeleteRepairs = async (req, res) => {
    const { id } = req.params;
    const RDelete = await RepairsServices.GetOne(id)
    if (!RDelete) {
        return res.status(404).json({
            status: "error",
            message: `The reparation with the id ${id} is not found`
        })
    }
    await RepairsServices.DeleteRepairS(RDelete)
    return res.status(200).json({
        message: "Repair Deleted successfully.!"
    })
}

module.exports = {
    GetAllRepairs,
    CreateRepair,
    GetOneRepairs,
    PatchRepairs,
    DeleteRepairs
}