import React from 'react'
import './index.css'

export default ({ message, color }) => {
    return (
        <>
            <div className={`alert ${color} `}>
                {message}
            </div>
        </>
    )
}
