const express = require("express");
const router = express.Router();

const controller = require('../controllers/login_controller');

router.get('/',controller.list);
router.post('/verif',controller.verif);


module.exports = router;