const UsersServices = require("./users.services")


const findAll = async (req, res) => {
    const NewUser = await UsersServices.GetAll();
    return res.status(200).json({
        message: 'method GET ',
        NewUser
    })
}

const Create = async (req, res) => {
    // const dataUser = req.body
    const { name, email, password, role } = req.body
    const NewUser = await UsersServices.create({ name, email, password, role })
    return res.status(200).json({
        message: 'method POST',
        data: NewUser
    })
}

const GetOne = async (req, res) => {
    const { id } = req.params;
    const NewUser = await UsersServices.GetOne(id)
    return res.status(200).json({
        message: 'method GET findOne',
        NewUser
    })
}

const Patch = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const NewChange = await UsersServices.GetOne(id)

        if (!NewChange) {
            return res.status(404).json({
                status: 'error',
                message: `User with the id: ${id} not found 🥴`
            })
        }
        const UserUpdated = await UsersServices.Update(NewChange, {
            name,
            email
        })
        return res.status(200).json({
            message: 'Info Changed 😉',
            UserUpdated
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'Something went very wrong! 💀',
            error
        })
    }
}

const Delete = async(req, res) => {
    const { id } = req.params
    const UserDelete = await UsersServices.GetOne(id)
    if (!UserDelete) {
        return res.status(404).json({
            status: 'error',
            message: `The user with the id: ${id} not found` 
        })
    }
    await UsersServices.Delete(UserDelete)
    return res.status(200).json({
        message:'❌ User deleted succesfully.! ❌'
    })
}

module.exports = {
    findAll,
    Create,
    GetOne,
    Patch,
    Delete
}