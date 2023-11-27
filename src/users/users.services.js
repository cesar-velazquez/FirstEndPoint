const UserModel = require('./users.model')

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
}
module.exports = UsersServices 