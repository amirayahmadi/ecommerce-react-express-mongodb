import React, { useContext, useState } from 'react'
import Pulse from 'react-reveal/Pulse';
import Button from '../Button';
import Input from '../Input';
import './index.css'
import { Link } from 'react-router-dom'
import axios from '../../config/axios'
import { apis } from '../../config/apisurls'
import Alert from '../Alert';
import { AuthContext } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom'
export default () => {


    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const [errors, seterrors] = useState([])

    const history = useHistory()

    const { setrole, setisauth } = useContext(AuthContext)

    const login = () => {

        let data = {
            email: email,
            password: password
        }

        axios.post(apis.authentification.login, data, { credentials: 'include' })
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    setrole(res.data.role)
                    setisauth(res.data.success)
                    history.push('/')
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

                <div className="login">

                    {
                        errors.map(err => {
                            return (
                                <>
                                    {
                                        err.path[0] === 'isactive' && <Alert color='danger' message={err.message} />
                                    }
                                </>
                            )
                        })
                    }

                    <Input errors={errors} onWrite={e => setemail(e.target.value)} name='email' type='text' placeholder='email' />
                    <Input errors={errors} onWrite={e => setpassword(e.target.value)} name='password' type='password' placeholder='password' />
                    <br />
                    <Link to='/forget' style={{ color: 'inherit', textDecoration: 'inherit' }} ><span className="forget"  >forget password ?</span></Link>
                    <br />

                    <Button text='Login' Click={login} />
                </div>


            </Pulse>
        </>
    )
}
