import React from "react";
import { Link } from 'react-router-dom';
import Navbar from "./Navbar"
import useLogout from "../hooks/useLogout";
import 'primeicons/primeicons.css';
import '../style/Conversation.css'
import '../style/Home.css'


const Profile = (props) => {

    const { loading, logout } = useLogout()

    const LogoutButton = () => {
        
        return (
            <div>{!loading ? <button id="logout" onClick={logout}>log out</button> : <i className="pi pi-spin pi-spinner"></i>}</div>
        )
    }

    const Profilecard = () => {
        return (
            <div className="profilecard">
                <div className="header">
                    <h2>Hello {JSON.parse(localStorage.getItem('darthrift-user')).username}</h2>
                    <LogoutButton />
                </div>
                <p>My items</p>
                <div className="my-items">
                    
                    <div className="item-container"></div>
                </div>
            </div>
        )
    }
 
    return (
        <>
            <Navbar />
            <div className="profileContent">
                <Profilecard />
                <Link to="/post">
                    <button className="sellButton">SELL</button>
                </Link>
            </div>
        </>
        
    )
}

export default Profile