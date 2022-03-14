import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { quatityChanged } from '../../features/cart/cartSlice'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { addOrder } from '../../features/orders/ordersSlice';

export default () => {

    const history = useHistory()

    const products = useSelector(state => state.cart.products)

    const dispatch = useDispatch()

    const { isauth } = useContext(AuthContext)

    const handleQutantiy = (e, id) => {
        const items = [...products]

        let arr = []

        for (let i in items) {

            if (items[i].product._id === id) {
                arr.push({ product: items[i].product, qte: Number(e.target.value) })
            } else {
                arr.push(items[i])
            }

        }


        dispatch(quatityChanged({ newCart: arr }))
    }

    const [total, settotal] = useState(0);

    useEffect(() => {

        let sum = 0

        for (let item of products) {
            sum += item.qte * item.product.price
        }

        settotal(sum)

    }, [products]);


    const createOrder = () => {

        let arr = []

        for (let item of products) {
            arr.push({ product: item.product._id, qte: item.qte })
        }

        let data = {
            products: arr,
            total: total
        }

        dispatch(addOrder(data))

    }


    return (
        <>
            <section className="shoping-cart spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="shoping__cart__table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="shoping__product">Products</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                            <th />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            products.map(p => {
                                                return (
                                                    <tr>
                                                        <td className="shoping__cart__item">
                                                            <img style={{ height: '100px', width: '120px' }} src={'http://localhost:5000/getimage/' + p.product.images[0].name} alt />
                                                            <h5>{p.product.name}</h5>
                                                        </td>
                                                        <td className="shoping__cart__price">
                                                            ${p.product.price}
                                                        </td>
                                                        <td className="shoping__cart__quantity">
                                                            <div className="quantity">
                                                                <div className="pro-qty">
                                                                    <input type="text" defaultValue={1} onChange={e => handleQutantiy(e, p.product._id)} />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="shoping__cart__total">
                                                            ${p.qte * p.product.price}
                                                        </td>
                                                        <td className="shoping__cart__item__close">
                                                            <span className="icon_close" />
                                                        </td>
                                                    </tr>

                                                )
                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div onClick={() => history.push('/shop')} className="shoping__cart__btns">
                                <a className="primary-btn cart-btn">CONTINUE SHOPPING</a>

                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="shoping__checkout">
                                <h5>Cart Total</h5>
                                <ul>

                                    <li>Total <span> {total} $</span></li>
                                </ul>
                                {isauth ? <a onClick={createOrder} className="primary-btn">PROCEED TO CHECKOUT</a> : <a className="primary-btn">LOGIN TO PROCEED TO CHECKOUT</a>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
};
