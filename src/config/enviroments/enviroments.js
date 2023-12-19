require('dotenv').config();
const env = require('env-var');

const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    DB_URI: env.get('DB_URI').required().asString(),
    SECRET_JWT_SEED: env.get('SECRET_JWT_SEED').required().asString(),
    JWT_EXPIRE_IN: env.get('JWT_EXPIRE_IN').required().asString(),
}

module.exports = { envs }