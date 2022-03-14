const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    client: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    products: [
        {
            product: {
                type: mongoose.Types.ObjectId,
                ref: 'product'
            },
            qte: Number
        }
    ],
    total: Number,
    status: {
        code: {
            type: Number,
            default: 1
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'user'
        }
    },
    livreur: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true })

module.exports = new mongoose.model('order', orderSchema)