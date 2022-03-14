import React, { useState } from 'react'
import './index.css'

export default ({ placeholder, type, errors, name, onWrite, value, disabled }) => {

    const [ispassword, setispassword] = useState(type === 'password' ? true : false)

    return (
        <>
            {
                type !== 'password'
                    ?
                    <>
                        <input disabled={disabled} value={value} className={`Input_Field ${errors ? errors.find(e => e.path[0] === name) ? 'has_error' : '' : ''} `} name={name} onChange={onWrite} type={type} placeholder={placeholder} />
                        {errors ? errors.find(e => e.path[0] === name) && < span className='error_message' >{errors.find(e => e.path[0] === name).message}</span> : null}
                    </>
                    :
                    <>
                        <div className={`passinput ${errors ? errors.find(e => e.path[0] === name) ? 'has_error' : 'has_no_errors' : 'has_no_errors'} `}>
                            <input value={value} className={` password ${errors ? errors.find(e => e.path[0] === name) ? 'has_error' : '' : ''} `} name={name} onChange={onWrite} type={ispassword ? "password" : 'text'} placeholder={placeholder} />
                            {
                                ispassword ?
                                    <i onClick={() => setispassword(!ispassword)} className="las la-eye-slash"></i>
                                    :
                                    <i onClick={() => setispassword(!ispassword)} class="las la-eye"></i>
                            }

                        </div>
                        {errors ? errors.find(e => e.path[0] === name) && < span className='error_message' >{errors.find(e => e.path[0] === name).message}</span> : null}
                    </>
            }



        </>
    )
}
