const  cors  = require('cors')
const Error = require('../../common/errors/error.Model')
const enableCors = (app, acceptedOrigins) => {
    //Con la siguiente linea estamos aceptando que cualquier frontend pueda acceder a nuestra api.
    // app.use(cors())
    app.use(
        cors({
        origin: (origin, callback) => {
            if (acceptedOrigins.includes(origin)) {
                return callback(null, true)
            }

            if (!origin) {
                return callback(null, true)
            }

            return callback(new Error('Not allowed by Cors'));
        }
    }))
}

module.exports = enableCors