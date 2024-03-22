import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Login.css'
import useSignup from '../hooks/useSignup';

const Signup = () => {
    const [user, setUser] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    });

    const { loading, signup } = useSignup();
    const navigate = useNavigate();

    const handleChange = (event) => {
        const {name, value} = event.target;
        setUser(prevUser => ({ 
            ...prevUser, 
            [name]: value,
        }))
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await signup(user)
    }

    return (
        <div className="login">
            <h1>Sign up</h1>
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <div className="label-container">
                        <input placeholder="email" type="email" onChange={handleChange} name="email" value={user.email}></input>
                    </div>
                    <div className="label-container">
                        <input placeholder="username" type="text" onChange={handleChange} name="username" value={user.username}></input>
                    </div>
                    <div className="label-container">
                        <input placeholder="password (at least 6 characters)" type="password" onChange={handleChange} name="password" value={user.password}></input>
                    </div>
                    <div className="label-container">
                        <input placeholder="confirm password" type="password" onChange={handleChange} name="confirmPassword" value={user.confirmPassword}></input>
                    </div>
                    <button id="login-button-v2" disabled={loading}>{!loading ? "Create an account" : <i className="pi pi-spin pi-spinner"></i>}</button>
                </form>
                <div className="buttonContainer">
                    <Link to="/login"><button id="signup-button-v2">Already have an account?</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Signup;