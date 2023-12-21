// middleware.js

const jwt = require('jsonwebtoken');
// const promisify = require('util');
const catchAsync = require('../common/errors/catchAsync.js');
const UsersServices = require('./users.services.js');
const { envs } = require('../config/enviroments/enviroments.js');
const AppError = require('../common/errors/appError.js');

// async function validateUserExists(req, res, next) {
//     const { id } = req.params;

//     try {
//         const user = await UsersServices.GetOne(id);

//         if (!user) {
//             return res.status(404).json({
//                 status: 'error',
//                 message: `Usuario con el ID: ${id} no encontrado`,
//             });
//         }

//         req.usuario = user;
//         next();
//     } catch (error) {
//         console.error('Error al validar usuario:', error);
//         res.status(500).json({
//             status: 'fail',
//             message: 'Error interno del servidor',
//         });
//     }
// }
const validateUserExists = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    // try {
    const user = await UsersServices.GetOne(id);

    if (!user) {
        return next(new AppError(`Usuario con el ID: ${id} no encontrado`));
    }

    req.usuario = user;
    next();
    // } catch (error) {
    //     console.error('Error al validar usuario:', error);
    //     res.status(500).json({
    //         status: 'fail',
    //         message: 'Error interno del servidor',
    //     });
    // }
})

const protect = catchAsync(async (req, res, next) => {
    //1 Obtener token
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    //2 validar si existe el token
    if (!token) {
        return next(
            new AppError("You aren't logged in!. Please login to get access", 401)
        );
    }
    // 3 Decodificar el token
    const decoded = await jwt.verify(token, envs.SECRET_JWT_SEED);
    // 4 Buscar el usuario
    const user = await UsersServices.GetOne(decoded.id)

    if (!user) {
        return next(new AppError('The owner of this token is not longer available', 401))
    }

    //! 5 Validar si el usuario cambio la contraseña recientemente, si es asi enviar un error
    if (user.passwordChangedAt) {
        const changedTimeStamp = parseInt(user.passwordChangedAt.getTime() / 1000, 10)
        if (decoded.iat < changedTimeStamp) {
            return next(new AppError('User recently changed password!, please login again', 401))
        }
    }

    // 6 Adjuntar el usuario en sesión, el usuario en sesion es el dueño del token.
    req.sessionUser = user; //!Importante
    next();

})

const protectAccountOwner = (req, res, next) => {
    // console.log(user)
    const { usuario, sessionUser } = req;
    // console.log("es el id: ", usuario.id)
    // console.log("sesión del id: ", sessionUser.id)
    if (usuario.id != sessionUser.id) {
        return next(new AppError('You do not own this account', 401));
    }
    next();
}

const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.sessionUser.role)) {
            return next(new AppError('You don´t have permission to perfom this action', 403))
        }
        next();
    }
}


module.exports = { validateUserExists, protect, protectAccountOwner, restrictTo };
