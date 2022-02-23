const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const { generarJWT } = require('../helpers/generarToken');
const db = require('../../database/models/index'); //requiring model
const UserModel = db['User']; //select the User model

const login = async (req = request, res = response) => {
    const {email, password } = req.body;
    try {   
        const user = await UserModel.findOne({ where: { email: email } })
        //Checking if the user exists
        if (!user) { 
            return res.status(500).json({message:'Correo incorrecto - El usuario con este correo no existe'});
        }
        //Checking the user's status
        if(!user.status){ 
            return res.status(500).json({message:'Login incorrecto - El usuario se encuentra en estado inactivo'});
        }
        //Checking the user's password
        if (!bcryptjs.compareSync(password,user.password)) {
            return res.status(500).json({message:'Contraseña incorrecta'});
        }
        const token = await generarJWT(user.id);
          
        return res.json({
            data: user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'JaldinServer:error at login, plis talk to the administrator',
        });
    }
}

module.exports = {
    login
}