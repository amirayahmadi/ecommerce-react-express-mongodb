import React, { useContext, useState } from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Alert from '../../components/Alert'
import './index.css'
import { AuthContext } from '../../context/AuthContext'
import axios from '../../config/axios'
import { apis } from '../../config/apisurls'

export default () => {

    const { user, setuser } = useContext(AuthContext)

    const [userdata, setuserdata] = useState({
        username: user ? user.username : '',
        email: user ? user.email : '',
        phone: user ? user.phone : '',
        adress: user ? user.adress : '',
        zip_code: user ? user.zip_code : '',
    })

    const handlechange = e => {

        const { name, value } = e.target;
        setuserdata(prevState => ({
            ...prevState,
            [name]: value
        }));

    }

    const [isuccess, setisuccess] = useState(false)

    const update = () => {
        console.log(userdata);
        axios.put(apis.authentification.update + user._id, userdata)
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    setuser(res.data.data)
                    setisuccess(true)

                    setTimeout(() => {
                        setisuccess(false)
                    }, 5000);
                }
            })
            .catch(err => {
                console.log(err.response);
            })
    }





    const handlephoto = e => {

        let data = new FormData()

        data.append('avatar', e.target.files[0])

        axios.put(apis.authentification.uploadavatar, data, { crendentials: 'include' })
            .then(res => {
                console.log(res);
                if (res.status === 200)
                    setuser(res.data.data)
            })
            .catch(err => {
                console.log(err.response);
            })

    }

    return (
        <>
            <div className="container">
                <div className="row profile ">
                    <div className="col-sm-12 col-md-12 d-flex justify-content-center avatardiv">
                        {user && <img className='useravatar img-thumbnail' src={process.env.REACT_APP_SERVER_DOMAIN + '/getimage/' + user.avatar} alt="" />}
                        <div className="upload_icon" >
                            <input id='uploadavatar' onChange={handlephoto} type="file" hidden />
                            <i onClick={() => document.getElementById('uploadavatar').click()} class="las la-pen"></i>
                        </div>
                    </div>

                    <div className="col-sm-12 col-md-6 mt-3 text-center">

                        {
                            isuccess
                            &&
                            <Alert message='successfuly updated' color={'success'} />

                        }

                        <Input onWrite={handlechange} value={userdata.username} type='text' name='username' placeholder='username' />
                        <Input onWrite={handlechange} disabled value={userdata.email} type='text' name='email' placeholder='email' />
                        <Input onWrite={handlechange} value={userdata.phone} type='number' name='phone' placeholder='phone' />
                        <Input onWrite={handlechange} value={userdata.adress} type='text' name='adress' placeholder='adress' />
                        <Input onWrite={handlechange} value={userdata.zip_code} type='number' name='zip_code' placeholder='zip_code' />
                        <br />
                        <br />
                        <Button Click={update} text='save' />
                        <br />
                        <br />
                    </div>

                </div>
            </div>
        </>
    )
}
