const { response, request } = require('express');

const db = require('../../database/models/index'); //requiring model
const UserModel = db['User']; //select the User model
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarToken');


const getLoggedUser = async(req = request,res = response) => {
    try {
        if(req.loggedUser === null){
        return res.status(401).json({message: 'no paso por la validacion del token'});
        }
        res.json({
            data:req.loggedUser,
            message: 'datos del usuario'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'JaldinServer:error habla con el administrador',
        });
    }
}

const getUserbyID =  async(req = request,res = response) => {
    const user = await UserModel.findByPk(req.params.id);
    res.json({
        message: `El Usuario ${user.name} es mostrado`,
        data: user
    });
}

const createUser =  async(req = request,res = response) => {
    try {
        const salt = bcryptjs.genSaltSync();
        const {name, email, password} = req.body;
        const checkEmail = await UserModel.findOne({ where: { email: email } });
        if(checkEmail){
            return res.status(401).json({message: `El correo ${email} ya esta en uso, elija otro email`,})
        }
        const user = await UserModel.create({
            name,
            email,
            password: bcryptjs.hashSync(password,salt)
        });
        const token = await generarJWT(user.id);
        return res.json({
            message: 'usuario creado con exito',
            data: user,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(401).json(
            {
                message: 'No se pudo crear usuario :c',
            }
        )
    }  
}

const updateUser =  async(req,res) => {
    //const id = req.params.id; // this is to pass the id of something through the url
   // const {id} = req.params.id; also u can make it like that
   // the url comes with an STRING data should parse it if I need int
   // req.query para pasar parametros por los PARAMS de la url
    const { name, email} = req.body;
    await UserModel.update({ name, email}, {
        where: {id: req.params.id }
    });
    const user = await UserModel.findByPk(req.params.id);
    res.json({
        message: `Usuario ${user.name} actualizado con exito`,
        data: user
    });
}

const activeUser = async(req,res) => {
    await UserModel.update({ status: true}, {
        where: {id: req.params.id }
    });
    const user = await UserModel.findByPk(req.params.id);
    res.json({
        message: `Usuario ${user.name} activado con exito`,
        data: user
    });
}

const desactiveUser = async(req,res) => {
    await UserModel.update({ status: false}, {
        where: {id: req.params.id }
    });
    const user = await UserModel.findByPk(req.params.id);
    res.json({
        message: `Usuario ${user.name} desactivado con exito`,
        data: user
    });
}



module.exports = {
    getUserbyID,
    updateUser,
    createUser,
    getLoggedUser,
    activeUser,
    desactiveUser
}