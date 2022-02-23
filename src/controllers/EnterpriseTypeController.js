const { response, request } = require('express');

const db = require('../../database/models/index'); //requiring model
const EnterpriseTypeModel = db['EnterpriseType'];

const allEnterpriseType = async (req = request, res = response) => {
    try {
        const data = await EnterpriseTypeModel.findAll();
        return res.json({
            message: 'Todos los tipos empresas mostradas con exito',
            data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'JaldinServer:error habla con el administrador',
        });
    }
}


module.exports = {
    allEnterpriseType
}