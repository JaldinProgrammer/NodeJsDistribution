const db = require('../../database/models/index'); //requiring model
const UserModel = db['User']; //select the User model
const {response, request} = require('express');

const validateSuperadmin = (req = request,res = response,next) => {

    if(req.loggedUser === null){
        return res.status(401).json({message: 'no paso por la validacion del token'});
    }
    //check superadmin
    if(!req.loggedUser.superAdmin){
        return res.status(401).json({message: 'Usted no es superadmin'});
    } 
    next();
}

module.exports = {
    validateSuperadmin
}