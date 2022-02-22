const { Router } = require('express');
const { validateJwt } = require('../middlewares/validateJwt');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');

const { getUser, createUser, putUser, deleteUser,getLoggedUser } = require('../controllers/UserController');
const { validateSuperadmin } = require('../middlewares/validateSuperadmin');

const router = Router();

router.get('/getLoggedUser',[
    validateJwt
],getLoggedUser);

router.get('/',[
    validateJwt,
    validateSuperadmin
],getUser);

router.put('/:id',putUser);

router.post('/',createUser);

router.delete('/',deleteUser);

module.exports = router;