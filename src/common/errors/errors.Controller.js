const { envs } = require("../../config/enviroments/enviroments.js");
const AppError = require("./appError.js");

const handleCastError23505 = () => {
    return new AppError('Duplicate field value:Please another value', 400);
}

const handleCastError22P02 = () => {
    return new AppError('Invalid data type in database', 400);
}
const sendErrorDev = (err, res) => {
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
        err,
    })
}

const sendErrorProd = (err, res) => {
    console.log(err.isOperational);
    if (err.isOperational) {
        // si es operational debemos enviarle el error al cliente
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        })
    } else {
        // si noi es operacional no se le envia ningun detalle
        console.log("ERROR ", err);
        return res.status(500).json({
            status: 'fail',
            message: 'Something went very wrong 😶'
        })

    }
};

const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'fail';

    if (envs.NODE_ENV === 'development') {
        sendErrorDev(err, res)
    }

    if (envs.NODE_ENV === 'production') {
        let error = err;
        if (err.parent.code === '23505') error = handleCastError23505();
        if (err.parent.code === '22P02') error = handleCastError22P02();

        sendErrorProd(error, res)
    }
}

module.exports = globalErrorHandler;