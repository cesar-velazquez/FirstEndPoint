const AppError = require("../common/errors/appError.js");
const catchAsync = require("../common/errors/catchAsync.js");
const { verifyPassword } = require("../config/plugin/encripted-password.plugin.js");
const generateJWT = require("../config/plugin/generate-jwt.plugin.js");
const { validateUser, validateLogin } = require("./users-Schema.js");
const UsersServices = require("./users.services.js");



const Create = async (req, res) => {
    try {
        const { hasError, errorMessages, userData } = validateUser(req.body);

        if (hasError) {
            return res.status(422).json({
                status: 'error',
                message: errorMessages,
            });
        }

        const { name, email, password, role } = userData;

        const NewUser = await UsersServices.create({ name, email, password, role });
        const token = await generateJWT(NewUser.id)

        return res.status(200).json({
            message: 'Usuario Creado con Éxito! 😃🙌',
            token,
            // message: 'Usuario Creado con Éxito!',
            // data: NewUser
            users: {
                id: NewUser.id,
                name: NewUser.name,
                email: NewUser.email,
                password: NewUser.password,
                role: NewUser.role,
            }
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 'fail',
            message: 'Something went very wrong! 💀',
            error,
        });
    }
};

const login = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, userData } = validateLogin(req.body);    

    // 1-traer datos y validar
    // const { hasError, errorMessages, userData } = validateLogin(req.body);

    if (hasError) {
        // console.log("errorrr controller 55", errorMessages)
        return res.status(422).json({
            status: 'error',
            message: errorMessages,
        })
    }
    // 2 Validar que el usuario exista en la base de datos
    const user = await UsersServices.findOneByEmail(userData.email)

    if (!user) {
        return next(new AppError(' This account does not exist', 404));
    }
    // 3 comprar y comprobar contraseña
    const isCorrectPasword = await verifyPassword(userData.password, user.password)

    if (!isCorrectPasword) {
        return next(new AppError('Email or Pasword Incorrect', 401));
    }
    // 4 Generar el jwt
    const token = await generateJWT(user.id);
    return res.status(200).json({
        token,
        message: 'Usuario Encontrado!',
        users: {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role,
        },
    })
});







const findAll = async (req, res) => {
    const NewUser = await UsersServices.GetAll();
    return res.status(200).json({
        message: 'method GET ',
        NewUser
    })
}


const GetOne = async (req, res) => {
    const { id } = req.params;
    const NewUser = await UsersServices.GetOne(id)
    return res.status(200).json({
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

const Delete = async (req, res) => {
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
        message: '❌ User deleted succesfully.! ❌'
    })
}

module.exports = {
    login,
    findAll,
    Create,
    GetOne,
    Patch,
    Delete
}