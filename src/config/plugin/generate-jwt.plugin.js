const jwt = require('jsonwebtoken');
const { envs } = require('../enviroments/enviroments.js');

const generateJWT = (id) => {
    return new Promise((resolve, reject) => {
        const payload = { id };
        jwt.sign(
            payload,
            envs.SECRET_JWT_SEED,
            {
                expiresIn: envs.JWT_EXPIRE_IN
            }, 
            (err, token) => {
                if (err) reject(err) 
                    resolve(token)                
            })
    })
}

module.exports = generateJWT;