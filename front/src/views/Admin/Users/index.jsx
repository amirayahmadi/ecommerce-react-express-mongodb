import React, { useEffect, useState } from 'react'
import { Table, Badge, Space, message } from 'antd';
import 'antd/dist/antd.css';
import axios from '../../../config/axios'
import { apis } from '../../../config/apisurls'
import './index.css'


export default () => {

    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: text => <img style={{ height: "40px", width: "40px", borderRadius: "50%" }} src={"http://localhost:5000/getimage/" + text} alt="" />,
        },
        {
            title: 'UserName',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },

        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <div onClick={() => deleteUser(record._id)} className='delete_icon' >
                        <i class="las la-trash-alt"></i>
                    </div>
                </Space>
            ),
        },
    ];


    const [users, setusers] = useState([])

    useEffect(() => {
        axios.get(apis.authentification.getall)
            .then(res => {
                console.log(res);
                if (res.status === 200) {

                    setusers(res.data.data.filter(u => u.role !== 'admin'))
                }
            })
            .catch(err => {
                console.log(err.response);
            })
    }, [])


    const deleteUser = id => {
        axios.delete(apis.authentification.deleteuser + id)
            .then(res => {
                if (res.status === 200) {
                    success('user successfuly deleted')
                    setusers(users.filter(u => u._id !== id))
                }
            })
    }

    const success = (text) => {
        message.success(text);
    };

    return (
        <>
            <div className="container">
                <h3>Users  <Badge count={users.length} showZero /></h3>

                <Table columns={columns} dataSource={users} />

            </div>
        </>
    )
}
