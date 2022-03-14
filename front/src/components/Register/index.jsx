import React, { useState } from 'react'
import './index.css'
import Pulse from 'react-reveal/Pulse';
import Input from '../Input';
import Button from '../Button';
import axios from '../../config/axios'
import { apis } from '../../config/apisurls'
import success from '../../assets/img/success.png'

export default () => {

    const [data, setdata] = useState({
        username: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        zip_code: "",
    })

    const [errors, seterrors] = useState([])
    const [issuccess, setissuccess] = useState(false)
    const [successmessage, setsuccessmessage] = useState('')
    const handlechange = e => {

        const { name, value } = e.target;
        setdata(prevState => ({
            ...prevState,
            [name]: value
        }));

    }

    const register = () => {
        setissuccess(false)
        seterrors([])
        axios.post(apis.authentification.register, data)
            .then(res => {
                console.log(res);
                if (res.status === 201) {
                    setissuccess(true)
                    setsuccessmessage(res.data.message)
                }
            })
            .catch(err => {
                console.log(err.response);
                if (err.response.status === 422) {
                    seterrors(err.response.data.errors.details)
                }
            })

    }

    return (
        <>
            <Pulse>

                {
                    issuccess
                        ?

                        <div className="success_register">
                            <img src={success} alt="" className='la-check-circle ' />
                            <h3>{successmessage}</h3>
                        </div>
                        :
                        <div className="register">
                            <Input errors={errors} onWrite={handlechange} name='username' type='text' placeholder='username' />
                            <Input errors={errors} onWrite={handlechange} name='email' type='text' placeholder='email' />
                            <Input errors={errors} onWrite={handlechange} name='password' type='password' placeholder='password' />
                            <Input errors={errors} onWrite={handlechange} name='phone' type='phone' placeholder='phone' />
                            <Input errors={errors} onWrite={handlechange} name='address' type='adress' placeholder='adress' />
                            <Input errors={errors} onWrite={handlechange} name='zip_code' type='number' placeholder='zip_code' />
                            <br />
                            <br />
                            <Button text='Register' Click={register} />
                        </div>

                }



            </Pulse>
        </>
    )
}
