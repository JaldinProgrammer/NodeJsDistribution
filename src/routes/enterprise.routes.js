const { Router } = require('express');
const router = Router();

const { allEnterprise } = require('../controllers/EnterpriseController');
const { validateJwt } = require('../middlewares/validateJwt');


router.get('/all',[
    validateJwt
],allEnterprise);

module.exports = router;