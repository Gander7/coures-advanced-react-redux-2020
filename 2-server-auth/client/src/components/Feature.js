import React from 'react'
//import requireAuth from './requireAuth'
import useAuth from './useAuth'

const Feature = () => {
    useAuth()
    return <div>Feature</div>
}

export default Feature