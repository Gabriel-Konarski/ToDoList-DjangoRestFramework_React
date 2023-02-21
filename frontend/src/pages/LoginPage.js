import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext';

const LoginPage = () => {
    let { loginUser } = useContext(AuthContext)
    return (
        <div className='layout'>
            <div className='Login-form'>
                <form onSubmit={loginUser}>
                    <input type='text' name='username' placeholder='Enter Username'></input>
                    <input type='password' name='password' placeholder='Enter Password'></input>
                    <input type='submit' />
                </form>
            </div>
        </div>
    )
}

export default LoginPage