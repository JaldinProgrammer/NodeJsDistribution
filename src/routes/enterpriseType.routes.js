const { Router } = require('express');
const router = Router();

const { allEnterpriseType } = require('../controllers/EnterpriseTypeController');
const { validateJwt } = require('../middlewares/validateJwt');


router.get('/all',[
    validateJwt
],allEnterpriseType);

module.exports = router;