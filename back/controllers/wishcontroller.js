const wish = require('../models/wishlist')

module.exports = {
    add: (req, res) => {
        wish.findOneAndUpdate({ client: req.user.id }, { $push: { products: req.body.product } })
            .populate('products')
            .then(wishes => {
                res.json(wishes)
            })
    },

    getWishs: (req, res) => {
        wish.find({ client: req.user.id })
            .populate('products')
            .then(wishes => {
                res.json(wishes)
            })
    }
}