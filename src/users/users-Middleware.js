// middleware.js

const UsersServices = require('./users.services.js');

async function validateUserExists(req, res, next) {
    const { id } = req.params;

    try {
        const user = await UsersServices.GetOne(id);

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: `Usuario con el ID: ${id} no encontrado`,
            });
        }

        req.usuario = user;
        next();
    } catch (error) {
        console.error('Error al validar usuario:', error);
        res.status(500).json({
            status: 'fail',
            message: 'Error interno del servidor',
        });
    }
}

module.exports = { validateUserExists };
