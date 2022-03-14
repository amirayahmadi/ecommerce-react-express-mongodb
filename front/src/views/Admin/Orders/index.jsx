import { useEffect, useState } from "react";
import axios from "../../../config/axios";
import { Tag } from 'antd'
import { Select } from 'antd';

const { Option } = Select;
export default () => {

    const [orders, setorders] = useState([]);

    const [providers, setproviders] = useState([]);

    useEffect(() => {
        axios.get('/orders', { credentials: 'include' })
            .then(res => {
                console.log(res);
                setorders(res.data.data)
            })

        axios.get('/users', { credentials: 'include' })
            .then(res => {
                console.log(res);
                setproviders(res.data.data.filter(u => u.role === "livreur"))
            })
    }, []);

    function handleChange(value, id) {
        console.log(`selected ${value}`);
        let data = {
            code: 2,
            livreur: value,
            id: id
        }

        axios.put('/orders', data, { credentials: 'include' })
            .then(res => {
                console.log(res);

            })
    }

    return (
        <>
            <div className="container">
                <h3>Orders</h3>

                <table className="table text-center" >
                    <thead>
                        <th>client</th>
                        <th>phone</th>
                        <th>products</th>
                        <th>total</th>
                        <th>date</th>
                        <th>Provider</th>
                        <th>actions</th>
                        <th>Status</th>
                    </thead>
                    <tbody>
                        {
                            orders.map(o => {
                                return (
                                    <tr>
                                        <td> {o.client.username} </td>
                                        <td> {o.client.phone} </td>
                                        <td> {o.products.length} </td>
                                        <td> {o.total} </td>
                                        <td> {o.createdAt} </td>
                                        <td>
                                            {
                                                o.livreur
                                                    ? o.livreur.username
                                                    :
                                                    <Select style={{ width: 120 }} onChange={e => handleChange(e, o._id)}>
                                                        {
                                                            providers.map(p => {
                                                                return (
                                                                    <Option value={p._id}>{p.username}</Option>
                                                                )
                                                            })
                                                        }
                                                    </Select>
                                            } </td>
                                        <td>
                                            <i style={{ fontSize: '25px ', color: 'green ', margin: '0px 10px' }} class="las la-check"></i>
                                            <i style={{ fontSize: '25px ', color: 'red ', margin: '0px 10px' }} class="las la-window-close"></i>
                                        </td>
                                        <td>
                                            {o.status.code === 1 && <Tag color="blue">not assigned</Tag>}
                                            {o.status.code === 2 && <Tag color="gold">in progress</Tag>}
                                            {o.status.code === 3 && <Tag color="red">refused</Tag>}
                                            {o.status.code === 4 && <Tag color="green">Livred</Tag>}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
};
