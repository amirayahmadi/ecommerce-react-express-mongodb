import React, { createContext, useState, useEffect } from 'react'
import Loader from '../components/Loader'
import axios from '../config/axios'
export const AuthContext = createContext();
// pour partaget le state sur l'alboresance de lapp react 
// 


const AuthProvider = ({ children }) => {

    const [isauth, setisauth] = useState(false)
    const [role, setrole] = useState('visitor')
    const [isLoaded, setisLoaded] = useState(false)
    const [user, setuser] = useState(null)

    useEffect(async () => {

        await axios.post('http://localhost:5000/users/isauthenticated', { credentials: 'include' })
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    console.log('sdfghjklm');
                    console.log(res.data);
                    setisauth(res.data.success)
                    setrole(res.data.role)
                    setuser(res.data.user)
                    setisLoaded(true)
                 
                
                }
            }).catch(err => {
                
                    setisLoaded(true)
                    setisauth(false)
                
            })
    }, [])

    return (
        <>
            {
                isLoaded ?
                    (<AuthContext.Provider value={{ role, setrole, isauth, setisauth, user, setuser }}>
                        {children}
                    </AuthContext.Provider>) :
                    <Loader />
            }
        </>
    )
}

export default AuthProvider
