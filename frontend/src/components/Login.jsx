import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {


    return (
        <div className="login">
            <h1>Login</h1>
            <div className="formContainer">
                <form action="POST">
                    <input type="email" onChange={handleChange} name="email" value={user.email}></input>
                    <input type="text" onChange={handleChange} name="displayName" value={user.displayName}></input>
                    <input type="text" onChange={handleChange} name="password" value={user.password}></input>
                    <button id="login-button" onClick={submit}>Log in</button>
                </form>
                <div className="buttonContainer">
                    <Link to="/api/auth/signup"><button id="signup-button">Sign up</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Login;