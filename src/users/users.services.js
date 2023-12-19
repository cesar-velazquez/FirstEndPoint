const UserModel = require('./users.model.js')

class UsersServices {

    static async GetAll() {
        return await UserModel.findAll();
    };

    static async create(data) {
        const newUser = await UserModel.create(data);
        return newUser
    }

    static async GetOne(id) {
        return await UserModel.findOne({
            where: {
                id: id,
                status: 'available'
            }
        });
    };

    static async Update(UserModel, data) {
        return await UserModel.update(data)
    }

    static async Delete(UserModel) {
        return await UserModel.update({
            status: 'disabled'
        })
    }
    
    static async findOneByEmail(email) {
        try {
            return await UserModel.findOne({
                where: {
                    status: 'available',
                    email: email,
                },
            });
        } catch (error) {
            throw new Error(`Error en findOneByEmail: ${error.message}`);
        }
    }


}
module.exports = UsersServices 