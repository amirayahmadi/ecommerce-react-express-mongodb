const express = require('express')

const orderController = require('../controllers/order_controller')

const verfiyToken = require('../middlewares/verifiyToken')

const route = express.Router()

route.post('/', verfiyToken, orderController.create)
route.get('/', verfiyToken, orderController.getOrders)
route.put('/' , verfiyToken , orderController.update)
module.exports = route