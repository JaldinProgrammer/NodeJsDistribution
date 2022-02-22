const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/AuthController');
const { validateFields } = require('../middlewares/validateFields');
const router = Router();
 
const prueba = router.post('/login',[
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email no es valido').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validateFields
], login)

module.exports = router;
