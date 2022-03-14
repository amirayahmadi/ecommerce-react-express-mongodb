import React, { useEffect, useState } from 'react'
import { Table, Badge, Space, message } from 'antd';
import './index.css'
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import axios from '../../../config/axios';
import { apis } from '../../../config/apisurls';
import Alert from '../../../components/Alert';

export default () => {


    const [icon, seticon] = useState('')
    const [name, setname] = useState('')

    const [display, setdisplay] = useState(false)

    const [issuccess, setissuccess] = useState(false)

    const [categories, setcategories] = useState([])

    useEffect(() => {
        axios.get(apis.categories.getall)
            .then(res => {
                setcategories(res.data.data)
            })
    }, [])

    const columns = [

        {
            title: 'Icon',
            key: 'icon',
            render: (text, record) => (
                <Space size="middle">

                    <i class={record.icon}></i>

                </Space>
            ),
        },
        {
            title: 'Name',
            key: 'name',
            render: (text, record) => (
                <Space size="middle">

                    {record.name}

                </Space>
            ),
        },
        {
            title: 'Delete',
            key: 'delete',
            render: (text, record) => (
                <Space size="middle">
                    <div className="delet_icon">

                        <i onClick={() => deleteCategory(record._id)} class="las la-trash-alt"></i>
                    </div>

                </Space>
            ),
        },
    ];

    const deleteCategory = id => {
        axios.delete(apis.categories.deletecategory + id)
            .then(res => {
                if (res.status === 200) {
                    let arr = [...categories]
                    let d = arr.filter(c => c._id !== id)
                    setcategories(d)
                    message.success('category successfuly deleted');
                }
            })
    }

    const addCategory = () => {

        let data = {
            icon: icon,
            name: name
        }

        axios.post(apis.categories.create, data)
            .then(res => {
                console.log(res);
                if (res.status === 201) {
                    setissuccess(true)
                    setdisplay(false)
                    setTimeout(() => {
                        setissuccess(false)
                    }, 3000);
                    setcategories(prev => ([...prev, res.data.data]))
                }
            })
    }

    return (
        <>
            <div className="container">
                <h3>Categories <Badge count={categories.length} showZero /> </h3>

                <div className="categories">

                    <div className="iconplacment">
                        {
                            display
                                ?
                                <div onClick={() => setdisplay(false)} className="closebutton">
                                    <i class="las la-times"></i>
                                </div>
                                :
                                <div onClick={() => setdisplay(true)} className="addbutton">
                                    <i class="las la-plus"></i>
                                </div>

                        }
                    </div>
                    <br />


                    {/* add category form */}

                    {
                        display
                        &&
                        <div className="category_form">
                            <Input onWrite={e => seticon(e.target.value)} type='text' name='icon' placeholder='icon' />
                            <Input onWrite={e => setname(e.target.value)} type='text' name='name' placeholder='name' />
                            <br />
                            <br />
                            <Button Click={addCategory} text='add' />
                        </div>
                    }

                    {
                        issuccess
                        &&
                        <Alert message='category successfuly added' color='success' />
                    }

                    {/* table */}
                    <Table columns={columns} dataSource={categories} />
                </div>
            </div>
        </>
    )
}
