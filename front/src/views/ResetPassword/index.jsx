import React, { useState } from 'react'
import Button from '../../components/Button'
import Input from '../../components/Input'
import axios from '../../config/axios'
import { useParams, useHistory } from 'react-router-dom'
import { apis } from '../../config/apisurls'
import Alert from '../../components/Alert'
export default () => {

    const [password, setpassword] = useState('')
    const [confirm, setconfirm] = useState('')

    const [errors, seterrors] = useState([])

    const [issuccess, setissuccess] = useState(false)

    const history = useHistory()

    const route = useParams()



    const reset = () => {

        let data = {
            password: password,
            confirm: confirm
        }

        axios.post(apis.authentification.resetpassword + route.token, data)
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    setissuccess(true)

                    setTimeout(() => {
                        setissuccess(false)
                        history.push('/authentication')
                    }, 4000);
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
            <div className="container text-center">
                <h3>Reset Password</h3>
                <br />
                <div className="row justify-content-md-center">
                    <div className="col-sm-12 col-md-4">

                        {
                            issuccess
                                ?
                                <Alert color='success' message='password successfuly rest' />
                                :
                                <>
                                    <Input errors={errors} name='password' onWrite={(e) => setpassword(e.target.value)} placeholder="password" type='password' />
                                    <Input errors={errors} name='confirm' onWrite={(e) => setconfirm(e.target.value)} placeholder="confirm" type='password' />
                                    <br />
                                    <br />
                                    <Button Click={reset} text='submit' />
                                    <br />
                                    <br />
                                </>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}
