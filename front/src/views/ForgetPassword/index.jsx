import React, { useState } from 'react'
import Pulse from 'react-reveal/Pulse';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Link } from 'react-router-dom'
import axios from '../../config/axios'
import { apis } from '../../config/apisurls'
import Alert from '../../components/Alert';

export default () => {

    const [email, setemail] = useState('')

    const [errors, seterrors] = useState([])

    const [issuccess, setissuccess] = useState(false)
    const [successmessage, setsuccessmessage] = useState('')

    const forget = () => {
        seterrors([])
        axios.post(apis.authentification.forget, { email: email })
            .then(res => {
                console.log(res);
                if (res.status === 200) {
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
        <div className="container">

            <div className="row justify-content-md-center">
                <div className="col-sm-12 col-md-4 ">
                    <div className="forget_password">
                        <h3>Forget Password</h3>
                        <br />
                        <Pulse>
                            {
                                issuccess
                                    ?
                                    <Alert message={successmessage} color='success' />
                                    :
                                    <>
                                        <Input errors={errors} name="email" onWrite={(e) => setemail(e.target.value)} type='text' placeholder='email' />

                                        <span className="forget"  ><Link style={{ color: 'inherit', textDecoration: 'inherit' }} to='/authentication'>login ?</Link></span>
                                        <br />
                                        <Button Click={forget} text='continue' /* Click={forget}  */ />
                                        <br />
                                        <br />
                                    </>
                            }
                        </Pulse>
                    </div>
                </div>
            </div>
        </div>
    )
}
