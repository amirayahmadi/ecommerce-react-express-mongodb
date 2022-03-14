import React, { useState } from 'react'
import Register from '../../components/Register'
import './index.css'

import Login from '../../components/Login';

export default () => {

    const [select, setselect] = useState(false)

    return (
        <>
            <div className="container text-center">

                <div className="authentication ">


                    <div className="row justify-content-md-center">
                        <div className="col-sm-12 col-md-4 ">
                            <div className="switch">
                                <div className={`togler ${!select ? 'moveleft' : 'moveright'} `}>

                                </div>
                                <button onClick={() => setselect(false)} >login</button>
                                <button onClick={() => setselect(true)} >register</button>
                            </div>

                            {

                                select
                                    ?
                                    <Register />

                                    :

                                    <Login />

                            }
                        </div>


                    </div>

                </div>
                <br />
            </div>
        </>
    )
}