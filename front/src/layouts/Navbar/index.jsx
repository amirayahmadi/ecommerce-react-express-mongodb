import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { apis } from '../../config/apisurls'
import axios from '../../config/axios'
import { AuthContext } from '../../context/AuthContext'
import { useHistory } from 'react-router'
import './index.css'
import 'antd/dist/antd.css';
import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { setSearchOptions } from '../../features/shop/shopSlice'
import { getWishes } from '../../features/wishlist/wishSlice'

const { Option } = Select;


export default () => {

    const { isauth, setisauth, role, setrole, user } = useContext(AuthContext)

    const history = useHistory()

    const [categories, setcategories] = useState('')

    const viewSizeWidth = useRef()

    const [displayDrawer, setdisplayDrawer] = useState(false)

    const cartProducts = useSelector(state => state.cart.products)
    const wishes = useSelector(state => state.wishes.wishes)

    const dispatch = useDispatch()

    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    useEffect(() => {
        isauth && dispatch(getWishes())
    }, []);




    const logout = () => {
        axios.post(apis.authentification.logout, { credentials: 'include' })
            .then(res => {
                if (res.status === 200) {
                    setisauth(res.data.isconnected)
                    setrole(res.data.role)
                    history.push('/authentication')
                }
            })
    }

    return (
        <>
            <div class="humberger__menu__overlay"></div>
            <div ref={viewSizeWidth} class={`humberger__menu__wrapper  ${displayDrawer ? 'show__humberger__menu__wrapper' : ''} `}>
                <div class="humberger__menu__logo">
                    <a onClick={() => setdisplayDrawer(!displayDrawer)} ><img src="img/logo.png" alt="" /></a>
                </div>
                <div class="humberger__menu__cart">
                    <ul>
                        <li onClick={() => history.push('/cart')} ><a ><i class="fa fa-shopping-bag"></i> <span>{cartProducts.length}</span></a></li>
                    </ul>
                    <div class="header__cart__price">item: <span>$150.00</span></div>
                </div>
                <div class="humberger__menu__widget">
                    <div class="header__top__right__language">
                        <img src="http://localhost:3000/img/language.png" alt="" />
                        <div>English</div>
                        <span class="arrow_carrot-down"></span>
                        <ul>
                            <li><a href="#">Spanis</a></li>
                            <li><a href="#">English</a></li>
                        </ul>
                    </div>
                    <div class="header__top__right__auth">
                        <Link to='/authentication' style={{ color: 'inherit', textDecoration: 'inherit' }} > <i class="fa fa-user"></i>Login </Link>
                    </div>
                </div>
                <nav class="humberger__menu__nav mobile-menu">
                    <ul>
                        <li class="active"><Link to='/' >Home</Link></li>
                        <li><Link to='/shop' >Shop</Link></li>
                        <li><Link to='/dashboard' >Dashboard</Link>
                            {isauth && <ul class="header__menu__dropdown">
                                {role === 'admin' && <li><Link to='/users' >Users</Link></li>}
                                {role === 'admin' && <li><Link to='/categories' >Categories</Link></li>}
                                {role === 'admin' && <li><Link to='/products' >Products</Link></li>}
                                <li><Link to='/orders' >Orders</Link></li>
                            </ul>}
                        </li>
                        <li><a href="./blog.html">Blog</a></li>
                        <li><a href="./contact.html">Contact</a></li>
                    </ul>
                </nav>
                <div id="mobile-menu-wrap"></div>
                <div class="header__top__right__social">
                    <a href="#"><i class="fa fa-facebook"></i></a>
                    <a href="#"><i class="fa fa-twitter"></i></a>
                    <a href="#"><i class="fa fa-linkedin"></i></a>
                    <a href="#"><i class="fa fa-pinterest-p"></i></a>
                </div>
                <div class="humberger__menu__contact">
                    <ul>
                        <li><i class="fa fa-envelope"></i> hello@colorlib.com</li>
                        <li>Free Shipping for all Order of $99</li>
                    </ul>
                </div>
            </div>

            <header className="header">
                <div className="header__top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <div className="header__top__left">
                                    <ul>
                                        <li><i className="fa fa-envelope" /> hello @colorlib.com</li>
                                        <li>Free Shipping for all Order of $99</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="header__top__right">
                                    <div className="header__top__right__social">
                                        <a href="#"><i className="fa fa-facebook" /></a>
                                        <a href="#"><i className="fa fa-twitter" /></a>
                                        <a href="#"><i className="fa fa-linkedin" /></a>
                                        <a href="#"><i className="fa fa-pinterest-p" /></a>
                                    </div>
                                    <div className="header__top__right__language">
                                        <img src="img/language.png" alt />
                                        <div>English</div>
                                        <span className="arrow_carrot-down" />
                                        <ul>
                                            <li><a href="#">Spanis</a></li>
                                            <li><a href="#">English</a></li>
                                        </ul>
                                    </div>
                                    <div className="header__top__right__auth ">
                                        <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }} >
                                            {!isauth && <Link to='/authentication' style={{ color: 'inherit', textDecoration: 'inherit' }} > <i class="fa fa-user"></i>Login </Link>}
                                            {isauth && <i onClick={logout} class="fa fa-user"> logout</i>}
                                            {isauth && <Link to='/profile'  >  <img src={'http://localhost:5000/getimage/' + user.avatar} class="img-thumbnail header_avatar ml-3" alt="..." /></Link>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="header__logo">
                                <a href="./index.html"><img src="img/logo.png" alt /></a>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <nav className="header__menu">
                                <ul>
                                    <li class="active"><Link to='/' >Home</Link></li>
                                    <li><Link to='/shop' >Shop</Link></li>
                                    {isauth && <li><Link to='/dashboard' >Dashboard</Link>
                                        <ul class="header__menu__dropdown">
                                            {role === 'admin' && <li><Link to='/users' >Users</Link></li>}
                                            {role === 'admin' && <li><Link to='/categories' >Categories</Link></li>}
                                            {role === 'admin' && <li><Link to='/products' >Products</Link></li>}
                                            <li><Link to='/orders' >Orders</Link></li>
                                        </ul>
                                    </li>}
                                    <li><a href="./blog.html">Blog</a></li>
                                    <li><a href="./contact.html">Contact</a></li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-lg-3">
                            <div className="header__cart">
                                <ul>
                                    <li  ><a ><i class="fa fa-heart"></i> <span>{wishes.length}</span></a></li>
                                    <li onClick={() => history.push('/cart')}><a ><i className="fa fa-shopping-bag" /> <span>{cartProducts.length}</span></a></li>
                                </ul>
                                <div className="header__cart__price">item: <span>$150.00</span></div>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => setdisplayDrawer(!displayDrawer)} className="humberger__open">
                        <i className="fa fa-bars" />
                    </div>
                </div>
            </header>

            <section className="hero">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-9">
                            <div className="hero__search">
                                <div className="hero__search__form">
                                    <form   >


                                        <input onChange={e => dispatch(setSearchOptions({ name: 'keyword', value: e.target.value }))} type="text" placeholder="What do yo u need?" />
                                        <button type="submit" className="site-btn">SEARCH</button>
                                    </form>
                                </div>
                                <div className="hero__search__phone">
                                    <div className="hero__search__phone__icon">
                                        <i className="fa fa-phone" />
                                    </div>
                                    <div className="hero__search__phone__text">
                                        <h5>+65 11.188.888</h5>
                                        <span>support 24/7 time</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section >


        </>
    )
}
