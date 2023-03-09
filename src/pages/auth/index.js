import React from 'react'
import Login from '../../components/login'
import Signup from '../../components/signup'
import './index.css'

const Auth = () => {
    return (
        <div>
            <Signup />
            <Login />
        </div>
    )
}

export default Auth