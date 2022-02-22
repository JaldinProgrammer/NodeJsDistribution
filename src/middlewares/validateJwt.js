const jwt = require('jsonwebtoken');
const {response, request} = require('express');

const db = require('../../database/models/index'); //requiring model
const UserModel = db['User']; //select the User model


const validateJwt = async(req = request,res = response,next) => {
    const token = req.header('bearer-token');
    if (!token) {
        return res.status(401).json(
            {
                message: 'No hay token en la peticion'
            }
        )
    }
    try {
        const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const userLogged = await UserModel.findByPk(id);
        if (!userLogged.status) {
            return res.status(401).json(
                {
                    message: 'El usuario esta inactivo'
                }
            )
        }
        req.loggedUser = userLogged;
        next();   
    } catch (error) {
        console.log(error);
        res.status(401).json(
           { message: 'token no valido'}
        )
    }
}

module.exports = {
    validateJwt
}