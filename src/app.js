const express = require('express')
const usersRoutes = require('./users/users-Routes.js')
const RepairsRoutes = require('./repairs/repairs.routes.js');
const AppError = require('./common/errors/appError.js');
const globalErrorHandler = require('./common/errors/errors.Controller.js');
const morgan = require('morgan');
const { envs } = require('./config/enviroments/enviroments.js');
const enableCors = require('./config/plugin/cors.plugin.js');

const app = express();
const ACCEPTED_ORIGINS = [
    'http://localhost:8080',
    'http://localhost:3000',
    // 'http://localhost:3001',
]
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

enableCors(app, ACCEPTED_ORIGINS)

if (envs.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

if (envs.NODE_ENV === 'production') {
    console.log("production")
}



app.use('/api/v1', usersRoutes);
app.use('/', RepairsRoutes);

app.all('*', (req, res, next) => {
    // const err = new Error(`Cant find ${req.originalUrl} on this server! `);
    // err.status = 'error';
    // err.statusCode = 404;
    return next(new AppError(`Cant find ${req.originalUrl} on this server!`, 404))
})

app.use(globalErrorHandler)


module.exports = app