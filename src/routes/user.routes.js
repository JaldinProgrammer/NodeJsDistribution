const { Router } = require('express');
const { validateJwt } = require('../middlewares/validateJwt');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');

const { getUserbyID, createUser, updateUser, activeUser,getLoggedUser,desactiveUser } = require('../controllers/UserController');
const { validateSuperadmin } = require('../middlewares/validateSuperadmin');

const router = Router();

router.get('/getLoggedUser',[
    validateJwt
],getLoggedUser);

router.get('/:id',[
    validateJwt,
],getUserbyID);

router.put('/:id',[
    validateJwt
],updateUser);

router.post('/',createUser);
// TODO: implement Roles and Rules to make a dinamyc Middleware

router.put('/active/:id',activeUser);

router.put('/desactive/:id',desactiveUser);

module.exports = router;