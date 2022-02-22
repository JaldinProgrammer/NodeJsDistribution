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
            msg: 'JaldinServer:error at login, plis talk to the administrator',
        });
    }
}



const getUser =  (req = request,res = response) => {
    //querys params
    // 
    const query = req.query;
    // con la desestructuracion podemos elegir los query params que queramos
    //y ademas settearles valores default
    //const {nombre= 'no name', edad = 21} = req.query;
    res.json({
        msq: 'get API',
        query
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

const putUser =  (req,res) => {
    const id = req.params.id; // this is to pass the id of something through the url
   // const {id} = req.params.id; also u can make it like that
   // the url comes with an STRING data should parse it if I need int
    res.json({
        msq: 'put API',
        id
    });
}

const deleteUser =  (req,res) => {
    res.json({
        msq: 'delete API'
    });
}


module.exports = {
    getUser,
    putUser,
    createUser,
    deleteUser,
    getLoggedUser
}