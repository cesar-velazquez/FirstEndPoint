require('dotenv').config();
const env = require('env-var');

const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    DB_URI: env.get('DB_URI').required().asString()
}

module.exports = { envs }