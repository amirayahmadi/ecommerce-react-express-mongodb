import './index.css'
import { Menu, Slider } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import axios from '../../config/axios';
import { apis } from '../../config/apisurls';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setSearchOptions } from '../../features/shop/shopSlice';

export default () => {

    const handleClick = e => {
        console.log('click ', e);
        dispatch(setSearchOptions({ name: 'category', value: e.key }))
    };

    const dispatch = useDispatch()

    const [categories, setcategories] = useState([]);

    useEffect(() => {
        axios.get(apis.categories.getall)
            .then(res => {
                console.log(res);
                setcategories(res.data.data)
            })
    }, []);

    function onChange(value) {
        console.log('onChange: ', value);
        //let dat = { name: 'category', value: value.key }
        dispatch(setSearchOptions({ name: 'price', value: value }))
    }

    const maxPrice = useSelector(state => state.shop.highPrice)

    return (
        <>
            <div className="categories_menu">
                <h5>Categories</h5>
                <Menu
                    onClick={handleClick}
                    style={{ width: 256 }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                >
                    <Menu.Item key={""} >

                        <span> All </span>
                    </Menu.Item>
                    {
                        categories.map(c => {
                            return (

                                <Menu.Item key={c._id} >
                                    <i className={c.icon} ></i>
                                    <span> {c.name} </span>
                                </Menu.Item>
                            )
                        })
                    }
                </Menu>
                <br />
                <br />
                <h5>filter by price</h5>
                <Slider max={maxPrice} style={{ width: 256 }} onChange={onChange} defaultValue={30} />
            </div>
        </>
    )
};