const { Router } = require('express')
const { check } = require('express-validator')

const router = Router();

const userCtrl = require('../controllers/user.controller.js')

router.get('/', userCtrl.getUsers)

module.exports = router