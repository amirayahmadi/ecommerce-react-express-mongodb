
import { useContext } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import product1 from '../../assets/img/product/product1.jpg'
import { apis } from '../../config/apisurls'
import axios from '../../config/axios'
import { AuthContext } from '../../context/AuthContext'
import { addProduct } from '../../features/cart/cartSlice'
import { addWish } from '../../features/wishlist/wishSlice'

export default ({ product }) => {

    const [isdeleted, setisdeleted] = useState(false)

    const deleteProduct = () => {
        axios.delete(apis.products.deleteprod + product._id)
            .then(res => {
                console.log(res);
                setisdeleted(true)
            })
    }

    const dispatch = useDispatch()

    const cartProducts = useSelector(state => state.cart.products)

    const { role } = useContext(AuthContext)

    return (
        <>
            {
                !isdeleted && <div class="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat">
                    <div class="featured__item">
                        <div class="featured__item__pic set-bg"
                            style={{ backgroundImage: `url(http://localhost:5000/getimage/${product.images[0].name})` }}
                        >
                            <ul class="featured__item__pic__hover">
                                <li onClick={() => dispatch(addWish({ product: product._id }))} ><a ><i class="fa fa-heart"></i></a></li>
                                {role === 'admin' && <li><a onClick={deleteProduct}><i class="las la-trash-alt"></i></a></li>}
                                <li  ><a><i style={{ color: cartProducts.find(p => p.product._id === product._id) ? 'green' : '' }} onClick={() => cartProducts.find(p => p.product._id === product._id) ? () => { } : dispatch(addProduct({ product: product, qte: 1 }))} class="fa fa-shopping-cart"></i></a></li>
                            </ul>
                        </div>
                        <div class="featured__item__text">
                            <h6><a href="#">{product.name}</a></h6>
                            <h5>${product.price}</h5>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
