const repairsModel = require('./repairs.Model')

class RepairsServices {
    static async GetAll() {
        return await repairsModel.findAll();
        return newRepair
    }

    static async create(data) {
        const newReapir = await repairsModel.create(data);
        return newReapir;
    }

    static async GetOne(id) {
        return await repairsModel.findOne({
            where: {
                id: id,
                status: 'pending'
            }
        });
    };

    static async UpdateRepair(repairsModel, data) {
        return await repairsModel.update(data)
    }

    static async DeleteRepairS(repairsModel){
        return await repairsModel.update({
            status:"disabled",            
        })
    }
}

module.exports = RepairsServices;