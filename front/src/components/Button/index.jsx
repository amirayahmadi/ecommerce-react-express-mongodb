import React from 'react'

export default ({ text, Click }) => {
    return (
        <>
            <button style={{borderRadius:"7px"}} onClick={Click} class="site-btn">{text}</button>
        </>
    )
}
