import CategoriesMenu from "../../components/CategoriesMenu";
import './index.css'
import { Row,  Pagination } from 'antd'
import Product from '../../components/Product'
import { useSelector, useDispatch } from "react-redux";
import { Search, setSearchOptions } from '../../features/shop/shopSlice'
import { useEffect } from "react";


export default () => {

    const dispatch = useDispatch()

    

    const paginationChanged = (value) => {
        console.log(value);
        dispatch(setSearchOptions({ name: 'currentPage', value: value }))
    }

    const searchOptions = useSelector(state => state.shop.searchOptions)
    const total = useSelector(state => state.shop.total)
    const products = useSelector(state => state.shop.products)
    useEffect(() => {

        dispatch(Search(searchOptions))

    }, [searchOptions])

    return (
        <>
            <div className="container">

                <div className="shop">
                    <CategoriesMenu />

                    <div className="products_shop">
                        <div className="products_count">

                            <div></div>
                            <span> ({products.length}) prodct </span>
                        </div>
                        <Row>
                            {
                                products.map(item => {
                                    return (
                                        <Product key={item._id} product={item} />
                                    )
                                })
                            }
                        </Row>
                        <br />
                        <br />
                        <Pagination
                            defaultCurrent={searchOptions.curentPage}
                            pageSize={searchOptions.pageSize}
                            total={total}
                            onChange={paginationChanged}
                        />
                    </div>
                </div>
                <br />
                <br />
                <br />
            </div>
        </>
    )
};