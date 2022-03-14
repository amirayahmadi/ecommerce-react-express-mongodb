const express = require('express')

const wishcontroller = require('../controllers/wishcontroller')
const verifyToken = require('../middlewares/verifiyToken')
const route = express.Router()

route.post('/', verifyToken, wishcontroller.add)
route.get('/', verifyToken, wishcontroller.getWishs)

module.exports = route