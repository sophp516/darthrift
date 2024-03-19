import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/Login.css'

const Signup = () => {
    const [user, setUser] = useState({
        email: "",
        displayName: "",
        password: ""
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setUser(prevUser => ({ 
            ...prevUser, 
            [name]: value,
        }))
    };

    return (
        <div className="login">
            <h1>Sign up</h1>
            <div className="formContainer">
                <form action="POST">
                    <input type="text" onChange={handleChange} name="email" value={user.email}></input>
                    <input type="text" onChange={handleChange} name="displayName" value={user.displayName}></input>
                    <input type="text" onChange={handleChange} name="password" value={user.password}></input>
                    <button id="signup-button">Sign up</button>
                </form>
                <div className="buttonContainer">
                    <Link to="/api/auth/login"><button id="login-button">Log in</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Signup;