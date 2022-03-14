const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
    client: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    products: [
   
              {  type: mongoose.Types.ObjectId,
                ref: 'product'}
        
    ]
}, { timestamps: true })

module.exports = new mongoose.model('wishlist', wishlistSchema)