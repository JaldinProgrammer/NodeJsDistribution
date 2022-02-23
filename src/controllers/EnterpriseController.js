const { response, request } = require('express');

const db = require('../../database/models/index'); //requiring model
const EnterpriseModel = db['Enterprise'];

const allEnterprise = async (req = request, res = response) => {
    try {
        const data = await EnterpriseModel.findAll();
        return res.json({
            message: 'Todas las empresas mostradas con exito',
            data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'JaldinServer:error habla con el administrador',
        });
    }
}



module.exports = {
    allEnterprise
}