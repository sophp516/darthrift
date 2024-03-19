import React from "react";
import { Link } from 'react-router-dom';
import Navbar from "./Navbar"
import '../style/Home.css'


const Profile = (props) => {
    return (
        <>
            <Navbar />
            <main>
                <Link to="/post">
                    <button className="sellButton">SELL</button>
                </Link>
            </main>
        </>
        
    )
}

export default Profile